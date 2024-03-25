import {StatusBar} from 'expo-status-bar';
import RootNavigation from "./src/navigation/RootNavigation";
import React, {useCallback, useEffect} from "react";
import {NativeBaseProvider} from "native-base";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import {I18nManager} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import SocketStore from "./src/store/SocketStore/socket-store";
import * as Updates from "expo-updates";
import {Audio} from "expo-av";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: true,
    allowsRecordingIOS: true,
    // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
});
export default function App() {
    const {setNavigation} = SocketStore
    const onSaveRefHandler = useCallback((navigationRef) => {
        // @ts-ignore
        setNavigation(navigationRef);
    }, [])
    const checkEasUpdates = async () => {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
        }
    }
    useEffect(() => {
        checkEasUpdates()
    }, []);
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NativeBaseProvider>
                <StatusBar hidden={false} style={'auto'} animated={true} translucent={true}/>
                <NavigationContainer
                    ref={onSaveRefHandler}
                >
                    <RootNavigation/>
                </NavigationContainer>
            </NativeBaseProvider>
        </GestureHandlerRootView>
    )
}

