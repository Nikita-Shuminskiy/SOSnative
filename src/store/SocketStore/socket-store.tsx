import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import io, {Socket} from "socket.io-client";
import {afflictionType, DataPatientType, JoinRoomType} from "../AuthStore/auth-store";
import {authApi, RoleType, RoomType} from "../../api/api";
import {MessageType} from "../../screen/commonScreen/Chat/types";

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

export class SocketStore {
    socket: Socket | null = null
    messages: MessageType[] = []
    dataRoom: RoomType | null = null
    dataScoresAfterChat: dataScoresAfterChat | null = null
    joinedRoom: JoinRoomType | null = null
    resultPatchedVolunteerData: ResultPatchedVolunteerDataType | null = null


    setDataRoom(dataRoom: RoomType): void {
        this.dataRoom = dataRoom
    }

    setResultPatchedVolunteerData(data: ResultPatchedVolunteerDataType): void {
        this.resultPatchedVolunteerData = data
    }

    setDataScoresAfterChat<T>(value: T, key: keyof dataScoresAfterChat): void {
        this.dataScoresAfterChat = {...this.dataScoresAfterChat, [key]: value}
    }

    setMessage(message: MessageType) {
        this.messages = [...this.messages, message]
    }

    setMessages(messages: MessageType[]) {
        this.messages = messages
    }

    setJoinedRoom(user: JoinRoomType) {
        this.joinedRoom = user
    }

    setSocket(socket) {
        this.socket = socket
    }

    sendMessage(message: string) {
        this.socket?.emit('create', 'messages', {content: message, roomId: this.dataRoom.id});
    }

    setVolunteerEvaluation(userId: string) {
        const volunteerEvaluationHandler = (data) => {
            this.disconnectSocket(userId)
        }
        this.socket?.emit('patch', 'rooms', this.dataRoom.id, this.dataScoresAfterChat, volunteerEvaluationHandler);
    }

    typingHandler() {
        this.socket?.emit('typing', 'rooms', {roomId: this.dataRoom.id})
    }

    async joinRoom(idRoom) {
        const {data} = await authApi.joinRoom(idRoom)
        this.setDataRoom(data)
        await this.socketInit();
        return data
    }

    async createRoom(dataPatient: DataPatientType) {
        const {data} = await authApi.createRoom(dataPatient)
        this.setDataRoom(data)
        await this.socketInit();
        return data
    }

    async socketInit() {
        try {
            const token = await deviceStorage.getItem('token')
            const socket = io('https://sos.luden-labs.com/', {
                rejectUnauthorized: false,
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.setSocket(socket)
        } catch (e) {
            console.log('error socket')
        }
    }

    clearData() {
        this.socket = null
        this.messages = [];
        this.dataRoom = null
        this.dataScoresAfterChat = null
        this.joinedRoom = null
        this.resultPatchedVolunteerData = null
    }

    disconnectSocket(userId: string) {
        const roomsCloseHandler = (data) => {
            console.log('rooms close', data)
        }
        this.socket?.emit('close', 'rooms', {userId, roomId: this.dataRoom.id}, roomsCloseHandler);
        this.dataRoom = {} as RoomType
        this.socket?.disconnect()
        this.socket = null
        this.setMessages([])
        this.setDataRoom({} as RoomType)
    }

    constructor() {
        makeObservable(this, {
            socket: observable,
            resultPatchedVolunteerData: observable,
            joinedRoom: observable,
            messages: observable,
            dataRoom: observable,
            dataScoresAfterChat: observable,
            setDataScoresAfterChat: action,
            setDataRoom: action,
            setJoinedRoom: action,
            setSocket: action,
            setResultPatchedVolunteerData: action,
            createRoom: action,
            joinRoom: action,
            setMessage: action,
            setVolunteerEvaluation: action,
            setMessages: action,
            sendMessage: action,
            socketInit: action,
            clearData: action,
            disconnectSocket: action,
            typingHandler: action,
        })
        this.setDataRoom = this.setDataRoom.bind(this)
        this.clearData = this.clearData.bind(this)
        this.setJoinedRoom = this.setJoinedRoom.bind(this)
        this.setResultPatchedVolunteerData = this.setResultPatchedVolunteerData.bind(this)
        this.setDataScoresAfterChat = this.setDataScoresAfterChat.bind(this)
        this.socketInit = this.socketInit.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.setVolunteerEvaluation = this.setVolunteerEvaluation.bind(this)
        this.setMessage = this.setMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.setMessages = this.setMessages.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
        this.typingHandler = this.typingHandler.bind(this)
        this.disconnectSocket = this.disconnectSocket.bind(this)
    }
}

export default new SocketStore()
