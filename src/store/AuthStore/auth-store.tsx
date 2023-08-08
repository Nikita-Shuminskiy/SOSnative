import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import {authApi, DataSignUpType, RoleType, RoomType, UserType} from "../../api/api";
import {createAlert} from "../../components/alert";

export type afflictionType = 'head' | 'heart' | 'stomach' | 'leftHand' | 'rightHand' | 'none'
export type DataPatientType = {
    "description"?: string,
    "affliction"?: afflictionType[],
    "conditionRate"?: number
}
export type AudienceType = { "avatar": string, "id": string, "name": string, "role": RoleType }
export type JoinRoomType = {
    "audience": AudienceType[]
    "joined": AudienceType,
    "roomId": string
}


export class AuthStore {
    user: UserType = {} as UserType
    token: string = '' as string
    isAuth: boolean = false
    newRoom: RoomType = {} as RoomType
    dataPatient: DataPatientType = {
        affliction: [],
        conditionRate: 1,
        description: ''
    } as DataPatientType
    rooms: RoomType[] = [] as RoomType[]

    setUser(userData: any): void {
        this.user = userData
    }

    setAuth(auth: boolean): void {
        this.isAuth = auth
    }

    async logout() {
        this.user = {} as UserType;
        this.token = '';
        this.isAuth = false;
        this.newRoom = {} as RoomType;
        this.dataPatient = {
            affliction: [],
            conditionRate: 1,
            description: ''
        };
        this.rooms = [];
        const token = await deviceStorage.getItem('token')
        const {data} = await authApi.logout(token)
        await deviceStorage.removeItem('token')
        this.setAuth(false)
        this.setUser({})
    }

    async login(userData: { email: string; password: string }): Promise<UserType> {
        const {data} = await authApi.login(userData.email, userData.password)
        await deviceStorage.saveItem('token', data.accessToken)
        this.setUser(data.user)
        this.token = data.accessToken
        this.setAuth(true)
        return data.user
    }

    async register(userData: DataSignUpType): Promise<DataSignUpType> {
        const {data} = await authApi.signup(userData)
        if (data.email) {
            await this.login({email: userData.email, password: userData.password})
        }
        return data
    }

    async forgotPassword(email: string) {
        const {data} = await authApi.forgotPassword(email)
        return data
    }


    setDataPatient<T>(value: T, key: keyof DataPatientType): void {
        this.dataPatient = {...this.dataPatient, [key]: value}
    }

    setNewRoom(room: RoomType) {
        this.newRoom = room
    }

    setRooms(rooms: RoomType[]) {
        if (this.rooms.length < rooms.length) {
            createAlert({
                title: 'Message',
                message: 'We have a new patient',
                buttons: [{text: 'Continue', style: "cancel"}]
            })
        }
        this.rooms = rooms
    }


    async findRooms() {
        const {data} = await authApi.findRooms()

        this.setRooms(data.data.filter(el => el.isActive))
    }

    async getDonePatients() {
        const {data} = await authApi.getDonePatients(this.user.id)
        return data
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            token: observable,
            newRoom: observable,
            isAuth: observable,
            rooms: observable,
            dataPatient: observable,
            setUser: action,
            setNewRoom: action,
            findRooms: action,
            setDataPatient: action,
            login: action,
            setAuth: action,
            logout: action,
            setRooms: action,
            getDonePatients: action,
            forgotPassword: action,
        })
        this.setAuth = this.setAuth.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
        this.setNewRoom = this.setNewRoom.bind(this)
        this.getDonePatients = this.getDonePatients.bind(this)
        this.setRooms = this.setRooms.bind(this)
        this.findRooms = this.findRooms.bind(this)
        this.setDataPatient = this.setDataPatient.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
}

export default new AuthStore()
