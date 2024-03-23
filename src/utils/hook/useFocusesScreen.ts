import {useEffect, useRef} from "react";
import {AppState} from "react-native";
import * as Updates from "expo-updates";
import {useIsFocused} from "@react-navigation/native";
import {Socket} from "socket.io-client";

type useAppBackgroundProps = {
    socket: Socket | null
    socketListener: () => void
    scrollToEnd: () => void
}
export const useFocusesScreen = ({socket, socketListener, scrollToEnd}: useAppBackgroundProps) => {

}