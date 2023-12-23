import {useEffect, useState} from 'react'
import {LoadingEnum} from '../../store/types/types'
import NetInfo from '@react-native-community/netinfo'
import NotificationStore from '../../store/NotificationStore/notification-store'
import SocketStore from "../../store/SocketStore/socket-store";
import AuthStore from "../../store/AuthStore/auth-store";
import * as Updates from "expo-updates";

export const useInternetConnected = () => {
    const {forcedClosingSocket, activeSessionCheck, socket} = SocketStore
    const {user} = AuthStore
    const [isConnected, setIsConnected] = useState(true)
    const checkInternetConnection = async () => {
        const {setIsLoading} = NotificationStore
        setIsLoading(LoadingEnum.fetching)
        try {
            const netInfoState = await NetInfo.fetch()
            setIsConnected(netInfoState.isConnected)
        } catch (e) {

        } finally {
            setIsLoading(LoadingEnum.success)
        }
    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isInternetReachable === false) {
                setIsConnected(false);
            } else {
                setIsConnected(true);
            }
        });

        return () => unsubscribe();
    }, []);
    return {
        isConnected,
        checkInternetConnection
    }
}
