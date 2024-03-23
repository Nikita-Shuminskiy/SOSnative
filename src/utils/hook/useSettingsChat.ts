import {useCallback, useEffect, useRef} from 'react'
import NetInfo from '@react-native-community/netinfo'
import {Socket} from "socket.io-client";
import {AppState, AppStateStatus} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {RoleEnum} from "../../api/type";

type useInternetConnectedProps = {
    socket: Socket | null,
    getMessages: () => void
    scrollToEnd: () => void
    setIsConnected: (isConnected: boolean) => void
    role: RoleEnum
}
export const useSettingsChat = ({socket, getMessages, role, scrollToEnd, setIsConnected}: useInternetConnectedProps) => {
    const isConnectedAfterRecovery = useRef(true);
    const appState = useRef(AppState.currentState);
    const focus = useIsFocused();

    const onConnectToSocket = useCallback(() => {
        socket?.connect();
        getMessages();
    }, [socket, getMessages]);

    useEffect(() => {
        if (focus) {
            if (socket?.connected) return console.log('при первом заходе сокет true ', role);
            console.log('при первом заходе сокет false => connect', role);
            onConnectToSocket();
            scrollToEnd();
            const handleNetInfoChange = (state: any) => {
                if (!state.isInternetReachable) {
                    console.log('отключение от интернета - делаю disconnect');
                    socket?.disconnect();
                    isConnectedAfterRecovery.current = false;
                    setIsConnected(false)
                    return;
                }
                if (state?.isInternetReachable && !socket?.connected) {
                    if (!isConnectedAfterRecovery.current) {
                        console.log('интернет восстановлен и сокет disconnected', role);
                        onConnectToSocket();
                        isConnectedAfterRecovery.current = true;
                        setIsConnected(true)
                    }
                }
            };
            const unsubscribe = NetInfo.addEventListener(handleNetInfoChange);
            const handleAppStateChange = (nextAppState: AppStateStatus) => {
                if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                    if (isConnectedAfterRecovery?.current && !socket?.connected) {
                        console.log('выход из фона соеденение потеряно, попытка подключения', role);
                        onConnectToSocket();
                    }
                }
                appState.current = nextAppState;
            };

            const sub = AppState.addEventListener('change', handleAppStateChange);
            return () => {
                unsubscribe();
                sub.remove()
            };
        }
        if (!focus) {
            console.log('фокус потерян - выход из чата', role);
            socket?.disconnect();
        }
    }, [focus]);

    return {
        isConnected: isConnectedAfterRecovery?.current,
    };
};