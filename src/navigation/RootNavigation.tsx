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

SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {isAuth, user} = AuthStore
  /*  useEffect(() => {

    }, [])*/
    return (
        <NavigationContainer>
            {isLoading === LoadingEnum.fetching && <Loading visible={true}/>}
            <RootStack.Navigator>
                {isAuth || user?.name ? (
                    user.role === 'volunteer' ?
                        <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.MAIN_VOLUNTEER}
                            component={MainVolunteerNavigation}
                        /> : <RootStack.Screen
                            options={{headerShown: false}}
                            name={routerConstants.MAIN_PATIENT}
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
