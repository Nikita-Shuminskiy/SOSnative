import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import io, {Socket} from "socket.io-client";
import {afflictionType, DataPatientType} from "../AuthStore/auth-store";
import {authApi, RoleType, UserType} from "../../api/api";
import {MessageType} from "../../screen/commonScreen/Chat/types";
import {BASE_URL} from "../../api/config";
import {Role} from "react-native";
import {routerConstants} from "../../constants/routerConstants";
import {createAlert} from "../../components/alert";

export type TypingUserType = {
    id: string,
    roomId: string,
    name: string
}
export type dataScoresAfterChat = { resultConditionRate: number, resultAffliction: afflictionType }
export type ResultPatchedVolunteerDataType = {
    affliction: afflictionType[]
    conditionRate: number,
    createdAt: string,
    description: string
    id: string,
    isActive: false,
    isOpen: false,
    patient: {
        avatar: string,
        email: string,
        emailVerified: boolean,
        id: string,
        name: string,
        preferredLang: string
        role: RoleType
    },
    resultAffliction: afflictionType[],
    resultConditionRate: number,
}

export type RoomType = {
    id: string;
    description: string;
    affliction: afflictionType[];
    conditionRate: number;
};

export type audienceType = {
    id: string;
    name: string;
    role: RoleType;
    avatar: null | string;
};
export type RoomDisconnectInfoType = { disconnected: audienceType, room: { id: string } }
export type DataJoinRoomType = {
    room: RoomType;
    joined: audienceType;
    audience: audienceType[];
};

export class SocketStore {
    socket: Socket | null = null
    user: UserType | null = null
    navigation: any | null = null
    messages: MessageType[] = []
    dataScoresAfterChat: dataScoresAfterChat | null = null
    joinedRoomData: DataJoinRoomType | null = null
    resultPatchedVolunteerData: ResultPatchedVolunteerDataType | null = null
    roomDisconnectInfo: RoomDisconnectInfoType | null = null
    currentUserConditionRate: number | null = null

    setResultPatchedVolunteerData = (data: ResultPatchedVolunteerDataType): void => {
        this.resultPatchedVolunteerData = data
    }

    setDataScoresAfterChat = (value: any, key: keyof dataScoresAfterChat): void => {
        this.dataScoresAfterChat = {...this.dataScoresAfterChat, [key]: value}
    }

    setMessage = (message: MessageType) => {
        this.messages = [...this.messages, message]
    }

    setMessages = (messages: MessageType[]) => {
        this.messages = messages
    }

    setJoinedRoom = (data: DataJoinRoomType) => {
        this.joinedRoomData = data
    }

    setSocket = (socket) => {
        this.socket = socket
    }

    setDisconnectInfo = (data: RoomDisconnectInfoType) => {
        this.roomDisconnectInfo = data
    }

    sendMessage = (message: string) => {
        this.socket?.emit('create', 'messages', {content: message});
    }

    setVolunteerEvaluation = (userId: string) => {
        const volunteerEvaluationHandler = (data) => {
            this.forcedClosingSocket(userId)
        }
        this.socket?.emit('patch', 'rooms', null, this.dataScoresAfterChat, volunteerEvaluationHandler);
    }

    typingHandler = () => {
        this.socket?.emit('typing', 'rooms')
    }

    sendSelectedRate = (conditionRate) => {
        this.socket?.emit('patch', 'rooms', null, {conditionRate: conditionRate[0]})
    }

    joinRoom = async (idRoom) => {
        const {data} = await authApi.joinRoom(idRoom)
        return data
    }

    createRoom = async (dataPatient: DataPatientType) => {
        const {data} = await authApi.createRoom(dataPatient)
        return data
    }
    getMessages = () => {
        this.socket?.emit('find', 'messages', {$limit: 5000}, (val, data) => {
            this.setMessages(data?.data)
        });
    }

    socketInit = async () => {
        try {
            const token = await deviceStorage.getItem('token')
            const socket = io(BASE_URL, {
                rejectUnauthorized: false,
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.setSocket(socket)
            socket?.on('messages created', (data: MessageType) => {
                console.log('messages created')
                this.setMessage(data)
            });
            socket?.on('connect_error', (data) => {
                console.log('connect_error', this.user.role)
            })
            socket?.on('rooms join', (data) => {
                this.setJoinedRoom(data)
            })
            socket?.on('rooms disconnect', (data: RoomDisconnectInfoType, err) => {
                this.setDisconnectInfo(data)
                const onPressExit = () => {
                    this.forcedClosingSocket(this.user?.id)
                    this.socket.off('rooms close')
                    this.navigation.navigate(this.user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                }
                createAlert({
                    title: 'Message',
                    message: `User ${data.disconnected.name} logged out`,
                    buttons: [{text: 'Exit', style: "default", onPress: onPressExit}, {text: 'Stay', style: "default"}]
                })
            })
            socket?.on('rooms patched', (data) => { // событие только для volun
                if (data.resultAffliction[0] !== 'none' || data.resultConditionRate !== null) {
                    this.socket.off('rooms close')
                    this.socket.off('rooms disconnect')
                    this.setResultPatchedVolunteerData(data)
                    this.forcedClosingSocket(this.user.id)
                    this.navigation.navigate(routerConstants.RESULT_WORK)
                } else {
                    this.setCurrentUserConditionRate(data.conditionRate)
                }
            })
            this.getMessages()
            socket?.on('rooms rate', () => {
                this.socket.off('rooms close')
                createAlert({
                    title: 'Message',
                    message: 'The patient has moved on to an evaluation',
                    buttons: [{text: 'Ok', style: "default"}]
                })
            })
            socket?.on('rooms close', () => {
                this.forcedClosingSocket(this.user?.id)
                this.navigation.navigate(this.user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                createAlert({
                    title: 'Message',
                    message: 'The room is closed',
                    buttons: [{text: 'Ok', style: "default"}]
                })
            })

            const roomsTimeoutHandler = () => {
                if (this.user.role === 'volunteer') return
                const onPressLeave = () => {
                    this.socket.off('rooms close')
                    this.socket.emit('rate', 'rooms')
                    this.navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
                }
                createAlert({
                    title: 'Message',
                    message: 'Time is running out, would you like to come out and appreciate?',
                    buttons: [{text: 'Go to evaluation', style: "cancel", onPress: onPressLeave}, {
                        text: 'Stay',
                        style: "default"
                    }]
                })
            }
            socket?.once('rooms timeout', roomsTimeoutHandler)

            return socket
        } catch (e) {
        }
    }

    activeSessionCheck = async (): Promise<any> => {
        try {
            const socket = await this.socketInit()
            return socket
        } catch (e) {
            return false
        }
    }

    setCurrentUserConditionRate = (rate) => {
        this.currentUserConditionRate = rate

    }

    forcedClosingSocket = (userId: string) => {
        this.socket?.off('rooms disconnect')
        const roomsCloseHandler = (data) => {
            this.clearData()
        }
        this.socket?.emit('close', 'rooms', {userId}, roomsCloseHandler);
    }

    clearData = () => {
        this.socket?.off('messages created')
        this.socket?.off('connect_error')
        this.socket?.off('rooms join')
        this.socket?.off('rooms disconnect')

        this.socket?.disconnect()
        this.socket = null
        this.messages = [];
        this.dataScoresAfterChat = null
        this.joinedRoomData = null
        this.resultPatchedVolunteerData = null
    }

    setNavigation = (navigation) => {
        this.navigation = navigation
    }

    setUser = (user) => {
        this.user = user
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new SocketStore()
