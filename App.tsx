import {StatusBar} from 'expo-status-bar';
import RootNavigation from "./src/navigation/RootNavigation";
import React, {useCallback} from "react";
import {NativeBaseProvider} from "native-base";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import {I18nManager} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import SocketStore from "./src/store/SocketStore/socket-store";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default function App() {
    const {setNavigation} = SocketStore
    const onSaveRefHandler = useCallback((navigationRef) => {
        // @ts-ignore
        setNavigation(navigationRef);
    }, [])
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

