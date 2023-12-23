import RootStore from "../../RootStore";import {RoomType, DataSignUpType, UserType} from "../../../api/api";import {LoadingEnum} from "../../types/types";import {DataPatientType} from "../../AuthStore/auth-store";import AsyncStorage from "@react-native-async-storage/async-storage";import {DataJoinRoomType} from "../../SocketStore/socket-store";import {routerConstants} from "../../../constants/routerConstants";export class AuthStoreService {    rootStore: typeof RootStore;    async login(payload: { email: string; password: string, rememberMe: boolean }): Promise<UserType | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            const data = await this.rootStore.AuthStore.login(payload);            this.rootStore.SocketStore.setUser(data)            return data        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Ошибка, введены не правильные данные');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async getUser(): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            const token = await AsyncStorage.getItem('token');            if (token) {                const userData = await this.rootStore.AuthStore.getUser();                this.rootStore.SocketStore.setUser(userData)                if(!this.rootStore.SocketStore?.socket) {                    this.rootStore.SocketStore.activeSessionCheck().then((socket) => {                        if(!!socket) {                            socket.once('rooms join', (data: DataJoinRoomType) => {                                if (data?.audience?.length) {                                    this.rootStore.SocketStore.setJoinedRoom(data)                                    this.rootStore.SocketStore.navigation?.navigate(routerConstants.CHAT)                                } else {                                    return this.rootStore.SocketStore.forcedClosingSocket(userData.id)                                }                            })                        }                    })                }            }        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Ошибка, введены не правильные данные');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async register(userData: DataSignUpType): Promise<DataSignUpType | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            return await this.rootStore.AuthStore.register(userData);        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async forgotPassword(email: string): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.AuthStore.forgotPassword(email);            this.rootStore.Notification.setNotification('success', true, 'Сheck your e-mail');        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async createRoom(dataPatient: DataPatientType): Promise<RoomType | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            return await this.rootStore.SocketStore.createRoom(dataPatient);        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async findRooms(): Promise<void> {        try {            await this.rootStore.AuthStore.findRooms();        } catch (e) {        } finally {        }    }    async updateUserAvatar(photo: string): Promise<void> {        try {            await this.rootStore.AuthStore.updateUserAvatar(photo);            await this.rootStore.AuthStore.getUser()        } catch (e) {            console.log(e,'upload')        } finally {        }    }    async logOut(): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.SocketStore.clearData();            await this.rootStore.AuthStore.logout()        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async joinRoom(idRoom): Promise<RoomType> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            return await this.rootStore.SocketStore.joinRoom(idRoom);        } catch (e) {            console.log(e, 'joinRoom')        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async getDonePatients(): Promise<{ total: number } | void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            return await this.rootStore.AuthStore.getDonePatients();        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    constructor(rootStore: typeof RootStore) {        this.rootStore = rootStore;    }}export default AuthStoreService;