import {useEffect, useState} from 'react';
import {AudienceType, DataJoinRoomType} from "../../../../store/SocketStore/type";

export const useActivity = (currentUser: AudienceType) => {
    const [showActivityInactive, setShowActivityInactive] = useState(false);
    useEffect(() => {
        if(currentUser) {
            setShowActivityInactive(true);
        }
    }, [currentUser]);

    useEffect(() => {
        if (showActivityInactive) {
            const timeoutId = +setTimeout(() => {
                setShowActivityInactive(false);
            }, 5000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [showActivityInactive]);

    return {
        showActivityInactive,
        currentUser
    }
};
/* if (isLogout) {
     const onPressExit = () => {
         forcedClosingSocket(user.id)
         setShowWhoLoggedInChat(false)
     }

     if (showWhoLoggedInChat) {
         createAlert({
             title: 'Message',
             message: `${getInfoInterlocutor.name} exited the chat room`,
             buttons: [{text: 'Exit', style: 'default', onPress: onPressExit}, {text: 'Stay', style: "default"}]
         })
     }
 } else {
 }*/