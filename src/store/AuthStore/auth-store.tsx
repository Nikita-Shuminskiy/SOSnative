import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import {authApi, DataSignUpType, RoleType, RoomType, UserType} from "../../api/api";
import {createAlert} from "../../components/alert";

export type afflictionType = 'head' | 'heart' | 'stomach' | 'leftHand' | 'rightHand' | 'none'
export type DataPatientType = {
    "description"?: string,
    "affliction"?: afflictionType[],
    "conditionRate"?: number
}

export class AuthStore {
    user: UserType = {} as UserType
    token: string = '' as string
    redirectFromNotification: string = '' as string
    isAuth: boolean = false
    newRoom: RoomType = {} as RoomType
    dataPatient: DataPatientType = {
        affliction: ["leftHand", "stomach"],
        conditionRate: 1,
        description: '123'
    } as DataPatientType
    rooms: RoomType[] = [] as RoomType[]

    setUser = (userData: any): void => {
        this.user = userData
    }

    setAuth = (auth: boolean): void => {
        this.isAuth = auth
    }

    logout = async () => {
        this.user = {} as UserType;
        this.token = '';
        this.redirectFromNotification = '';
        this.isAuth = false;
        this.newRoom = {} as RoomType;
        this.dataPatient = {
            affliction: [],
            conditionRate: 0,
            description: ''
        };
        this.rooms = [];
        const token = await deviceStorage.getItem('token')
        const {data} = await authApi.logout(token)
        await deviceStorage.removeItem('token')
        this.setAuth(false)
        this.setUser({})
    }

    login = async (payload: { email: string; password: string, rememberMe?: boolean }): Promise<UserType> => {
        const {data} = await authApi.login(payload)
        await deviceStorage.saveItem('token', data.accessToken)
        this.setUser(data.user)
        this.token = data.accessToken
        this.setAuth(true)
        return data.user
    }

    register = async (userData: DataSignUpType): Promise<DataSignUpType> => {
        const {data} = await authApi.signup(userData)
        if (data.email) {
            await this.login({email: userData.email, password: userData.password})
        }
        return data
    }

    forgotPassword = async (email: string) => {
        const {data} = await authApi.forgotPassword(email)
        return data
    }


    setDataPatient = (value: any, key: keyof DataPatientType): void => {
        this.dataPatient = {...this.dataPatient, [key]: value}
    }

    setNewRoom = (room: RoomType) => {
        this.newRoom = room
    }

    setRooms = (rooms: RoomType[]) => {
        /* if (this.rooms.length < rooms.length) {
             createAlert({
                 title: 'Message',
                 message: 'We have a new patient',
                 buttons: [{text: 'Continue', style: "cancel"}]
             })
         }*/
        this.rooms = rooms
    }


    findRooms = async () => {
        const {data} = await authApi.findRooms()
        this.setRooms(data.data.filter(el => el.isActive))
    }
    getUser = async () => {
        const {data} = await authApi.getUser()
        this.setUser(data.data[0])
        this.setAuth(true)
        return data.data[0]
    }

    getDonePatients = async () => {
        const {data} = await authApi.getDonePatients(this.user.id)
        return data
    }
    setRedirectFromNotification = (route: string) => {
        this.redirectFromNotification = route
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new AuthStore()
