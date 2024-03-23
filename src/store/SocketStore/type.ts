import {AfflictionType} from "../AuthStore/auth-store";
import {RoleEnum, UserType} from "../../api/type";

export type DataScoresAfterChatType = { resultConditionRate: number, resultAffliction: AfflictionType }
export type MessagePayloadType = {
    content?: string
    imageUrl?: string
    tool?: string
}
export type ResultPatchedVolunteerDataType = {
    affliction: AfflictionType[]
    conditionRate: number,
    createdAt: string,
    description: string
    id: string,
    isActive: false,
    isOpen: false,
    patient: UserType,
    resultAffliction: AfflictionType[],
    resultConditionRate: number,
}

export type RoomType = {
    id: string;
    description: string;
    affliction: AfflictionType[];
    conditionRate: number;
};

export type AudienceType = {
    id: string;
    name: string;
    role: RoleEnum;
    avatar: null | string;
};
export type RoomDisconnectInfoType = { disconnected: AudienceType, room: { id: string } }
export type DataJoinRoomType = {
    room: RoomType;
    joined: AudienceType;
    audience: AudienceType[];
};
export type VolunteerActionType = {
    id: number;
    text: string;
    color: string;
    highlight: null | string; // null or string
    value: string
};

export type VolunteerToolboxType = {
    id: number;
    name: string;
    image: string;
    color: string;
    data: VolunteerActionType[];
};
