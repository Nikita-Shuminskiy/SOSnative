import React, {useCallback, useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";
import AuthStore from "../store/AuthStore";
import NotificationStore from "../store/NotificationStore/notification-store";
import {NavigationContainer} from "@react-navigation/native";
import {LoadingEnum} from "../store/types/types";
import Loading from "../components/Loading";
import { routerConstants } from '../constants/routerConstants';
import HomeS from "../screen/mainScreens/HomeS";
import LoginS from "../screen/authScreens/LoginS";
import * as SplashScreen from 'expo-splash-screen';
import {ActivityIndicator} from "react-native";
import * as Font from 'expo-font';
SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const { isLoading } = NotificationStore
    const { isAuth, user } = AuthStore

    return (
        <NavigationContainer>
            {isLoading === LoadingEnum.fetching && <Loading visible={true} />}
            <RootStack.Navigator>
                {isAuth ? (
                    <RootStack.Screen
                        options={{ headerShown: false }}
                        name={routerConstants.MAIN}
                        component={HomeS}
                    />
                ) : (
                    <RootStack.Screen
                        options={{ headerShown: false }}
                        name={routerConstants.LOGIN}
                        component={LoginS}
                    />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

export default RootNavigation;