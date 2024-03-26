import {makeAutoObservable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import io, {Socket} from "socket.io-client";
import {DataPatientType} from "../AuthStore/auth-store";
import {authApi} from "../../api/api";
import {MessageType} from "../../screen/commonScreen/Chat/types";
import {BASE_URL} from "../../api/config";
import {routerConstants} from "../../constants/routerConstants";
import {createAlert} from "../../components/alert";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {
    AudienceType,
    DataJoinRoomType,
    DataScoresAfterChatType,
    MessagePayloadType,
    ResultPatchedVolunteerDataType,
    RoomDisconnectInfoType,
    VolunteerToolboxType
} from "./type";
import {RoleEnum, UserType} from "../../api/type";
import {playSound, PlaySoundData} from "../../utils/playSound";

export class SocketStore {
    socket: Socket | null = null
    user: UserType | null = null
    navigation: any | null = null
    messages: MessageType[] = []
    dataScoresAfterChat: DataScoresAfterChatType | null = null
    joinedRoomData: DataJoinRoomType | null = null
    patientJoinedData: AudienceType | null = null
    volunteerJoinedData: AudienceType | null = null
    resultPatchedVolunteerData: ResultPatchedVolunteerDataType | null = null
    roomDisconnectInfo: RoomDisconnectInfoType | null = null
    currentUserConditionRate: number | null = null
    isConnected: boolean = true
    toolboxVolunteer: VolunteerToolboxType[] | null = null

    setIsConnected = (isConnected: boolean) => {
        this.isConnected = isConnected
    }
    setResultPatchedVolunteerData = (data: ResultPatchedVolunteerDataType): void => {
        this.resultPatchedVolunteerData = data
    }

    setDataScoresAfterChat = (value: any, key: keyof DataScoresAfterChatType): void => {
        this.dataScoresAfterChat = {...this.dataScoresAfterChat, [key]: value}
    }

    setMessage = (message: MessageType) => {
        if(message.from.id !== this.user.id) {
            playSound(PlaySoundData.inbox)
        } else {
            playSound(PlaySoundData.out)
        }
        this.messages = [...this.messages, message]
    }

    setMessages = (messages: MessageType[]) => {
        this.messages = messages
    }

    setJoinedRoom = (data: DataJoinRoomType) => {
        console.log(data?.audience?.length, 'setJoinedRoom', this.user.role)
        this.joinedRoomData = data
        this.patientJoinedData = data.audience.find(user => user.role === RoleEnum.PATIENT)
        this.volunteerJoinedData = data.audience.find(user => user.role === RoleEnum.VOLUNTEER)
    }

    setSocket = (socket: Socket) => {
        console.log('setSocket')
        this.socket = socket
        this.socketListener()
    }

    setDisconnectInfo = (data: RoomDisconnectInfoType) => {
        this.roomDisconnectInfo = data
    }

    sendMessage = (payload: MessagePayloadType) => {
        this.socket?.emit('create', 'messages', payload);
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

    sendSelectedRate = (conditionRate: number[]) => {
        this.socket?.emit('patch', 'rooms', null, {conditionRate: conditionRate[0]})
    }

    getToolboxVolunteer = async () => {
        const {data} = await authApi.getToolboxVolunteer()
        this.toolboxVolunteer = data as VolunteerToolboxType[]
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
        this?.socket?.emit('find', 'messages', {$limit: 5000}, (val, data) => {
            this.setMessages(data?.data)
        });
    }

    socketInit = async () => {
        try {
            const token = await deviceStorage.getItem('token')
            const socket = io(BASE_URL, {
                rejectUnauthorized: false,
                reconnection: true,
                autoConnect: false,
                transports: ['websocket'],
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });

            this.setSocket(socket)
            return socket
        } catch (e) {
        }
    }
    socketListener = () => {
        this.socket?.on("connect", () => {
            if (this.socket.recovered) {
                console.log('any event missed during the disconnection period will be received now', this.user.role)
            } else {
                //
                this.getMessages()
                console.log(' new or unrecoverable session1', this.user.role)
            }
        });
        this.socket?.on('messages created', this.setMessage);
        this.socket?.on('connect_error', (data) => {
            console.log(data?.message, this.socket?.disconnected, 'socket?.disconnected')
            // socket?.disconnect();
            if (data?.message === "Room for this user not found") {
                this.forcedClosingSocket(this.user?.id)
                this.socket?.off('rooms close')
                this.navigation.navigate(this.user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            }
        })
        this.socket?.on('rooms join', this.setJoinedRoom)
        this.socket?.on('rooms disconnect', (data: RoomDisconnectInfoType, err) => {
            this.setDisconnectInfo(data)
            const onPressExit = () => {
                this.forcedClosingSocket(this.user?.id)
                this.socket.off('rooms close')
                this.navigation.navigate(this.user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            }
            console.log(`User ${data.disconnected.name} logged out, ${this.user?.role}`)
            /* createAlert({
                 title: 'Message',
                 message: `User ${data.disconnected.name} logged out`,
                 buttons: [{text: 'Exit', style: "default", onPress: onPressExit}, {text: 'Stay', style: "default"}]
             })*/
        })
        this.socket?.on('rooms patched', (data) => { // событие только для volun
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
        this.socket?.on('rooms rate', () => {
            this.socket.off('rooms close')
            createAlert({
                title: 'Message',
                message: 'The patient has moved on to an evaluation',
                buttons: [{text: 'Ok', style: "default"}]
            })
        })
        this.socket?.on('rooms close', () => {
            this.clearData()
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
        this.socket?.once('rooms timeout', roomsTimeoutHandler)
    }
    clearData = () => {
        this.socket?.removeAllListeners()
        this.socket?.disconnect()
        this.socket = null
        this.messages = [];
        this.dataScoresAfterChat = null
        this.patientJoinedData = null
        this.volunteerJoinedData = null
        this.joinedRoomData = null
        this.resultPatchedVolunteerData = null
    }

    checkActiveSession = async () => {
       try {
           const {data} = await authApi.getCurrentActiveRoom()
           if (data?.audience?.length > 0) {
               await this.socketInit()
               return true
           } else {
               return false
           }
       } catch (e) {
           return false
       }
    }

    setCurrentUserConditionRate = (rate: number) => {
        this.currentUserConditionRate = rate
    }

    forcedClosingSocket = (userId: string) => {
        this.socket?.off('rooms disconnect')
        this.socket?.emit('close', 'rooms', {userId}, this.clearData);
    }
    setNavigation = (navigation: NavigationProp<ParamListBase>) => {
        this.navigation = navigation
    }

    setUser = (user: UserType) => {
        this.user = user
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new SocketStore()
