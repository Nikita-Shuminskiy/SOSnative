import React, {useState, useEffect} from 'react';
import {createAlert} from "../../../components/alert";
import {Text} from "react-native";
import SocketStore from "../../../store/SocketStore/socket-store";

export const useLoggedInChatUser = (user, getInfoInterlocutor, isLogout = false) => {
    const {
        forcedClosingSocket
    } = SocketStore
    const [showWhoLoggedInChat, setShowWhoLoggedInChat] = useState(false);

    useEffect(() => {
        if (
            (user.role === 'patient' && getInfoInterlocutor?.role === 'volunteer') ||
            (user.role === 'volunteer' && getInfoInterlocutor?.role === 'patient')
        ) {
            setShowWhoLoggedInChat(true);
        } else {
            setShowWhoLoggedInChat(false);
        }
    }, [user, getInfoInterlocutor]);
    useEffect(() => {
        if (isLogout) {
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
            if (showWhoLoggedInChat) {
                const timeoutId = +setTimeout(() => {
                    setShowWhoLoggedInChat(false);
                }, 3000);

                return () => {
                    clearTimeout(timeoutId);
                };
            }
        }
    }, [showWhoLoggedInChat]);

    return {
        showWhoLoggedInChat
    }
};
