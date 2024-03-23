import {AfflictionType} from "../store/AuthStore/auth-store";

export type DataType<T> = {
    "total": number,
    "limit": number,
    "skip": number,
    "data": T
}
export type RoomType = {
    "affliction": AfflictionType[],
    "conditionRate": number,
    "createdAt": string,
    "description": string,
    "id": string,
    "isActive": boolean,
    "isOpen": boolean,
    "patient": UserType,
    "resultAffliction": AfflictionType[],
    "resultConditionRate": number,
    "updatedAt": string,
    "volunteer": string
}
export type ResponseType = {
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
    "role": RoleEnum,
    "preferredLang": string,
    "emailVerified": boolean,
    "emailVerificationToken": string,
    "avatar": string
}
export type LoginPayloadType = {
    strategy: "google" | "local" | 'apple',
    accessToken?: string,
    user?: any
    role?: RoleEnum
    email?: string; password?: string, rememberMe?: boolean
}

export enum RoleEnum {
    VOLUNTEER = 'volunteer',
    PATIENT = 'patient'
}

export enum UploadScope {
    AVATARS = 'avatars',
    ROOMS = 'rooms'
}

export type DataSignUpType = {
    email: string
    password: string
    name: string
    role: RoleEnum
    preferredLang: string
    "emailVerified"?: boolean,
    "avatar"?: any
}
