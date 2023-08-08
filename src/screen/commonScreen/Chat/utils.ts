import {AudienceType, JoinRoomType} from "../../../store/AuthStore/auth-store";
import {UserType} from "../../../api/api";

export const getInfoAboutInterlocutor = (joinedRoom: JoinRoomType, currentUser: UserType): AudienceType | undefined => {
    const volunteerInfo = joinedRoom?.audience?.find(el => el.role === 'volunteer')
    const patientInfo = joinedRoom?.audience?.find(el => el.role === 'patient')
    if (currentUser.role === 'patient') {
        return volunteerInfo ? volunteerInfo : joinedRoom?.joined?.id === currentUser?.id ? undefined : joinedRoom?.joined
    } else {
        return patientInfo
    }
}
