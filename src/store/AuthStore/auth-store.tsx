import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import {authApi, DataSignUpType, RoleType, RoomType, UserType} from "../../api/api";
export type afflictionType = 'head'| 'heart'| 'stomach'| 'leftHand'| 'rightHand'| 'none'
export type DataPatientType = {
    "description"?: string,
    "affliction"?: afflictionType[],
    "conditionRate"?: number
}

export type JoinRoomType = { "roomId": string, "user": { "id": string, "name": string, "role": RoleType } }

export class AuthStore {
    user: UserType = {} as UserType
    token: string = '' as string
    isAuth: boolean = false
    dataPatient: DataPatientType = {
        affliction: [],
        conditionRate: 1,
        description: ''
    } as DataPatientType
    rooms: RoomType[] = [] as RoomType[]
    donePatients: number = 0

    setUser(userData: any): void {
        this.user = userData
    }
    setAuth(auth: boolean): void {
        this.isAuth = auth
    }
    async logout() {
        const token = await deviceStorage.getItem('token')
        const {data} = await authApi.logout(token)
        await deviceStorage.removeItem('token')
        this.setAuth(false)
        this.setUser({})
    }
    async login(userData: { email: string; password: string }) {
        const {data} = await authApi.login(userData.email, userData.password)
        await deviceStorage.saveItem('token', data.accessToken)
        this.setUser(data.user)
        this.token = data.accessToken
        this.setAuth(true)
    }
    async register(userData: DataSignUpType) {
        const {data} = await authApi.signup(userData)
        if (data.email) {
            this.login({email: userData.email, password: userData.password})
        }
    }


    setDataPatient<T>(value: T, key: keyof DataPatientType): void {
        this.dataPatient = {...this.dataPatient, [key]: value}
    }

    setRooms(rooms: RoomType[]) {
        this.rooms = rooms
    }
    setDonePatient(patients: number) {
        this.donePatients = patients
    }
    async findRooms() {
        const {data} = await authApi.findRooms()
        this.setRooms(data.data)
    }
    async getDonePatients() {
        const {data} = await authApi.getDonePatients(this.user.id)
        this.setDonePatient(data?.total)
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            token: observable,
            isAuth: observable,
            rooms: observable,
            dataPatient: observable,
            setUser: action,
            setDonePatient: action,
            findRooms: action,
            setDataPatient: action,
            login: action,
            setAuth: action,
            logout: action,
            setRooms: action,
            getDonePatients: action,
        })
        this.setAuth = this.setAuth.bind(this)
        this.setDonePatient = this.setDonePatient.bind(this)
        this.getDonePatients = this.getDonePatients.bind(this)
        this.setRooms = this.setRooms.bind(this)
        this.findRooms = this.findRooms.bind(this)
        this.setDataPatient = this.setDataPatient.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
}

export default new AuthStore()
