import {UserType} from "../../../api/type";
import {AudienceType, DataJoinRoomType} from "../../../store/SocketStore/type";


export const getInfoAboutInterlocutor = (joinedRoom: DataJoinRoomType, currentUser: UserType): AudienceType | undefined => {
    if (currentUser.role === 'volunteer') {
        return joinedRoom?.audience[0]?.role === 'patient' ? joinedRoom.audience[0] : joinedRoom?.joined?.role === 'patient' ? joinedRoom?.joined : joinedRoom?.audience[1]?.role === 'patient' ? joinedRoom?.audience[1] : null
    }
    if (currentUser.role === 'patient') {
        return joinedRoom?.audience[0]?.role === 'volunteer' ? joinedRoom.audience[0] : joinedRoom?.joined?.role === 'volunteer' ? joinedRoom?.joined : joinedRoom?.audience[1]?.role === 'volunteer' ? joinedRoom?.audience[1] : null
    }
}
export const uniqueMessagesHandler = (messages) => {
    return messages.filter((obj, index, self) => {
        const foundIndex = self.findIndex(item => item.id === obj.id);
        return index === foundIndex;
    });
}
