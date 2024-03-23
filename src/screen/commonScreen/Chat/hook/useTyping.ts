import {useEffect, useState} from "react";
import {MessageType} from "../types";
import {Socket} from "socket.io-client";
type useTypingProps = {
    socket: Socket | null
}
export const useTyping = ({socket}: useTypingProps) => {
    const [typingUser, setTypingUser] = useState<{
        user: MessageType,
        isTyping: boolean
    } | null>(null);
    let typingTimeout;
    const resetTypingState = () => {
        setTypingUser({...typingUser, isTyping: false});
    };
    useEffect(() => {
        if (socket) {
            socket?.on('rooms typing', (data, err) => {
                if (data && data?.id !== typingUser?.user?.id) {
                    setTypingUser({user: data, isTyping: true});
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                    }
                    typingTimeout = setTimeout(resetTypingState, 1000);
                }
            })
        }
    }, [socket])
    return {
        typingUser
    }
}