import React, {useEffect} from 'react';
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
import MainPatientNavigation from "./MainPatientNavigation";
import RegisterS from "../screen/authScreens/RegisterS";
import ResetPasswordS from "../screen/authScreens/ResetPasswordS";
import MainVolunteerNavigation from "./MainVolunteerNavigation";
import * as Notifications from 'expo-notifications';
import {authApi} from "../api/api";

SplashScreen.preventAutoHideAsync();

/*const registerForPushNotifications = async () => {
    useEffect(() => {
        const registerForPush = async () => {
            try {
                // Запрашиваем разрешение на отправку уведомлений
                const { status } = await Notifications.getPermissionsAsync();
                if (status !== 'granted') {
                    await Notifications.requestPermissionsAsync();
                }

                // Получаем токен устройства
                const tokenData = await Notifications.getExpoPushTokenAsync();
                const token = tokenData.data;
                console.log('Device Token:', token);
            } catch (error) {
                console.log('Error registering for push notifications:', error);
            }
        };

        registerForPush();
    }, []);
};*/
const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {isAuth, user} = AuthStore

    return (
        <NavigationContainer>
            {isLoading === LoadingEnum.fetching && <Loading visible={true}/>}
            <RootStack.Navigator>
                {isAuth || user?.name ? (
                    user.role === 'volunteer' ?
                        <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.MAIN}
                            component={MainVolunteerNavigation}
                        /> : <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.MAIN}
                            component={MainPatientNavigation}
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

                    </React.Fragment>

                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

export default RootNavigation;
