import {useEffect} from "react";
import SocketStore, {DataJoinRoomType} from "../../store/SocketStore/socket-store";
import {routerConstants} from "../../constants/routerConstants";
import AuthStore from "../../store/AuthStore/auth-store";

export const useCheckConnectToSocket = () => {
    const {user} = AuthStore
    const {navigation} = SocketStore
    //const { checkInternetConnection, isConnected } = useInternetConnected()
    const {activeSessionCheck, setJoinedRoom, forcedClosingSocket, setMessages, socket, clearData} = SocketStore
    const connectToSocket = () => {
        activeSessionCheck().then((socket) => {
            socket?.once('rooms join', (data: DataJoinRoomType) => {
                if (data.audience.length) {
                    setJoinedRoom(data)
                    navigation?.navigate(routerConstants.CHAT)
                } else {
                    return forcedClosingSocket(user.id)
                }
            })
        })
    }
    /* useEffect(() => {
         if(!isConnected) {
             clearData()
             createAlert({
                 title: 'Message',
                 message: 'Unstable connection to internet',
                 buttons: [{text: 'Reconnect', style: 'default', onPress: checkInternetConnection}]
             })
         }
         if(isConnected) {
             connectToSocket()
         }
     }, [isConnected])*/
    useEffect(() => {
        if (!socket) {
            connectToSocket()
        }
    }, [])
}
