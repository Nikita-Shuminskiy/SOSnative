import {instance} from "./config";
import {afflictionType, DataPatientType} from "../store/AuthStore/auth-store";
import {AxiosResponse} from 'axios';
import {convertToFormDataImg} from "../utils/utils";

export const authApi = {
    async login(payload: { email: string; password: string, rememberMe?: boolean }): Promise<AxiosResponse<ResponseType, any>> {
        return await instance.post(`authentication`, {...payload, strategy: 'local'})
    },
    async logout(aссessToken: string) {
        return await instance.delete<ResponseType>(`authentication/${aссessToken}`)
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
    async updateUserAvatar(photo: string) {
        const formData = await convertToFormDataImg(photo)
        return await instance.post(`upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    },
    async getDonePatients(idVolunteer: string) {
        return await instance.get(`rooms/?volunteer=${idVolunteer}`)
    },
    async joinRoom(idRoom) {
        return await instance.patch<RoomType>(`rooms/${idRoom}?isOpen=true`, {isOpen: false})
    },

    async sendToken(payload: { token: string, device: string, platform: string, osVersion: string }) {
        return await instance.post<any>(`device-tokens`, payload)
    }

}
export type DataType<T> = {
    "total": number,
    "limit": number,
    "skip": number,
    "data": T
}
export type RoomType = {
    "affliction": afflictionType[],
    "conditionRate": 1,
    "createdAt": string,
    "description": string,
    "id": string,
    "isActive": boolean,
    "isOpen": boolean,
    "patient": {
        "avatar": string,
        "email": string,
        "emailVerified": boolean,
        "id": string,
        "name": string,
        "preferredLang": string,
        "role": RoleType
    },
    "resultAffliction": afflictionType[],
    "resultConditionRate": number,
    "updatedAt": string,
    "volunteer": string
}
type ResponseType = {
    "accessToken": string,
    "authentication": {
        "strategy": string,
        "payload": {}
    },
    "user": UserType
}
export type UserType = {
    "id": string,
    "email": string,
    "password": string,
    "name": string,
    "role": RoleType,
    "preferredLang": string,
    "emailVerified": boolean,
    "emailVerificationToken": string,
    "avatar": string
}
export type RoleType = 'volunteer' | 'patient'
export type DataSignUpType = {
    email: string
    password: string
    name: string
    role: 'volunteer' | 'patient'
    preferredLang: string
    "emailVerified"?: boolean,
    "avatar"?: any

}
