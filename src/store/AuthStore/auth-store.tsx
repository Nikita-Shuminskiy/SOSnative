import {makeAutoObservable} from "mobx";
import {deviceStorage} from "../../utils/storage/storage";
import {authApi} from "../../api/api";
import {DataSignUpType, LoginPayloadType, RoomType, UploadScope, UserType} from "../../api/type";
import {Linking, Platform} from "react-native";
import {createAlert} from "../../components/alert";
import Constants from "expo-constants"
import {APPLE_STORE_URL, PLAY_STORE_URL} from "../../constants/common";

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

    logout = async (isDelete: boolean = false) => {
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
        const{data} = isDelete ? await authApi.deleteAccount() : await authApi.logout(token)
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
    async getAppVersion() {
        const {data} = await authApi.getAppVersion()
      /*  console.log(Constants?.expoConfig?.version)
        console.log(data?.version)*/
        if (Constants?.expoConfig?.version < data?.version) {
            // version from app.json
            const onPressGoMarket = async () => {
                if (Platform.OS === "ios") return
                await Linking.openURL(PLAY_STORE_URL) //Platform.OS === "ios" ? APPLE_STORE_URL :
            }
            createAlert({
                title: "Message",
                message: "Updates available",
                buttons: [{text: "Update", style: "default", onPress: onPressGoMarket}, {text: "Later", style: "default"}],
            })
        }
        return data
    }
    constructor() {
        makeAutoObservable(this)
    }
}

export default new AuthStore()
