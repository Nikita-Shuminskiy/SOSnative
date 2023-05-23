import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";
import AuthStore from "../store/AuthStore";
import NotificationStore from "../store/NotificationStore/notification-store";
import {NavigationContainer} from "@react-navigation/native";
import {LoadingEnum} from "../store/types/types";
import Loading from "../components/Loading";
import {routerConstants} from '../constants/routerConstants';
import LoginS from "../screen/authScreens/LoginS";
import * as SplashScreen from 'expo-splash-screen';
import MainNavigation from "./MainNavigation";
import RegisterS from "../screen/authScreens/RegisterS";
import ResetPasswordS from "../screen/authScreens/ResetPasswordS";
import DashboardS from "../screen/volounerScreens/DashboardS";

SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {isAuth} = AuthStore
    return (
        <NavigationContainer>
            {isLoading === LoadingEnum.fetching && <Loading visible={true}/>}
            <RootStack.Navigator>
                {isAuth ? (
                    <RootStack.Screen
                        options={{headerShown: false}}
                        name={routerConstants.MAIN}
                        component={MainNavigation}
                    />
                ) : (
                    <React.Fragment>
                        <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.LOGIN}
                            component={LoginS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.REGISTRATION}
                            component={RegisterS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.RESET_PASSWORD}
                            component={ResetPasswordS}
                        />

                        {/*Volunteer navigation*/}

                        <RootStack.Screen
                            options={{headerShown: false, animation: 'flip'}}
                            name={routerConstants.DASHBOARD}
                            component={DashboardS}
                        />
                    </React.Fragment>

                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

export default RootNavigation;