import {makeAutoObservable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import {authApi} from "../../api/api";
import {DataSignUpType, LoginPayloadType, RoomType, UploadScope, UserType} from "../../api/type";

export type AfflictionType = 'head' | 'heart' | 'stomach' | 'leftHand' | 'rightHand' | 'none'
export type DataPatientType = {
    "description"?: string,
    "affliction"?: AfflictionType[],
    "conditionRate"?: number
}

export class AuthStore {
    user: UserType = {} as UserType
    token: string = '' as string
    redirectFromNotification: string = '' as string
    isAuth: boolean = false
    newRoom: RoomType = {} as RoomType
    dataPatient: DataPatientType = {
        conditionRate: 0,
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

    login = async (payload: LoginPayloadType): Promise<UserType> => {
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
            await this.login({email: userData.email, password: userData.password, strategy: 'local'})
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
    sendUserPhoto = async (photo: string, scope: UploadScope) => {
        const {data} = await authApi.updateUserPhoto(photo, scope)
        return data
    }
    changeUser = async (photo: string) => {
        const {data} = await authApi.changeUser(photo, this.user.id)
        return data
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
