import {instance} from "./config";
import {DataPatientType} from "../store/AuthStore/auth-store";
import {AxiosResponse} from 'axios';
import {convertToFormDataImg} from "../utils/utils";
import {DataSignUpType, DataType, LoginPayloadType, RoomType, UploadScope, UserType} from "./type";
import {AudienceType, VolunteerToolboxType} from "../store/SocketStore/type";

export const authApi = {
    async login(payload: LoginPayloadType) {
        return await instance.post(`authentication`, payload)
    },
    async getAppVersion() {
        return await instance.get<{ version: string }>(`app-version?latest=true`)
    },
    async logout(aссessToken: string) {
        return await instance.delete<ResponseType>(`authentication/${aссessToken}`)
    },
    async deleteAccount() {
        return await instance.post(`users/me/delete`)
    },
    async signup(data: DataSignUpType): Promise<AxiosResponse<DataSignUpType, any>> {
        return await instance.post(`users`, data)
    },
    async forgotPassword(email: string) {
        return await instance.post<DataSignUpType>(`forgot-password`, {email})
    },
    async getUser() {
        return await instance.get<DataType<UserType[]>>(`users`)
    },
    async createRoom(data: DataPatientType) {
        return await instance.post<RoomType>(`rooms`, data)
    },
    async findRooms() {
        return await instance.get<DataType<RoomType[]>>(`rooms?$sort[createdAt]=-1&isOpen=true`)
    },
    async updateUserPhoto(photo: string, scope: UploadScope) {
        const formData = await convertToFormDataImg(photo, scope)
        return await instance.post(`upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    },
    async changeUser(photo: string, idUser) {
        console.log(idUser, photo)
        return await instance.patch(`users/${idUser}`, {avatar: photo})
    },
    async getDonePatients(idVolunteer: string) {
        return await instance.get(`rooms/?volunteer=${idVolunteer}`)
    },
    async joinRoom(idRoom) {
        return await instance.patch<RoomType>(`rooms/${idRoom}?isOpen=true`, {isOpen: false})
    },
    async getCurrentActiveRoom() {
        return await instance.get<{ audience: AudienceType[] }>(`rooms?audience=true`)
    },
    async sendToken(payload: { token: string, device: string, platform: string, osVersion: string }) {
        return await instance.post<any>(`device-tokens`, payload)
    },
    async getToolboxVolunteer() {
        return await instance.get<VolunteerToolboxType[]>(`toolbox`)
    },
}
