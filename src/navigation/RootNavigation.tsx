import React, {useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";
import NotificationStore from "../store/NotificationStore/notification-store";
import {LoadingEnum} from "../store/types/types";
import Loading from "../components/Loading";
import {routerConstants} from '../constants/routerConstants';
import LoginS from "../screen/authScreens/LoginS";
import RegisterS from "../screen/authScreens/RegisterS";
import ResetPasswordS from "../screen/authScreens/ResetPasswordS";
import VolunteerProfileS from "../screen/volounterScreens/VolunteerProfileS";
import ResultWorkS from "../screen/volounterScreens/ResultWorkS";
import ChatS from "../screen/commonScreen/Chat/ChatS";
import DashboardS from "../screen/volounterScreens/DashboardS";
import ProblemDescription from "../screen/patientScreens/ProblemDescription";
import Index from "../screen/patientScreens/BodyAssessment";
import EmotionalStateS from "../screen/patientScreens/EmotionalStateS";
import UserProfileS from "../screen/patientScreens/UserProfileS";
import GoodbyePageS from "../screen/patientScreens/GoodbyePageS";
import {useBackgroundTime} from "../utils/hook/useBackgroundTime";
import {useNotification} from "../utils/hook/useNotification";
import VolunteerWaitingS from "../screen/patientScreens/VoluntersWaiting/VolunteerWaitingS";
import SplashS from "../screen/authScreens/SplashS";
import * as Updates from "expo-updates";
import rootStore from "../store/RootStore/root-store";
import BodyAssessmentS from "../screen/patientScreens/BodyAssessment";

const RootStack = createNativeStackNavigator()
const backgroundHandler = async (time: number) => {
    console.log(time, 'backgroundHandler')
    /*   if (time >= 10) {
           await Updates.reloadAsync()
           return
       }*/
}

const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {AuthStore} = rootStore
    const {isAuth} = AuthStore
    useBackgroundTime({backgroundHandler})
    useNotification()
    return (
        <>
            {isLoading === LoadingEnum.fetching && <Loading visible={true}/>}
            <RootStack.Navigator initialRouteName={routerConstants.SPLASH}>
                <RootStack.Screen
                    options={{headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false}}
                    name={routerConstants.SPLASH}
                    component={SplashS}
                />
                {
                    isAuth && <>
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false}}
                            name={routerConstants.NEED_HELP}
                            component={ProblemDescription}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_right', gestureEnabled: false}}
                            name={routerConstants.EVALUATION_CONDITION}
                            component={BodyAssessmentS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_right', gestureEnabled: false}}
                            name={routerConstants.EMOTIONAL_STATE}
                            component={EmotionalStateS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'fade_from_bottom'}}
                            name={routerConstants.USER_PROFILE}
                            component={UserProfileS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'flip', gestureEnabled: false}}
                            name={routerConstants.GOODBYE}
                            component={GoodbyePageS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_right', gestureEnabled: false}}
                            name={routerConstants.SEARCHING_VOLUNTEER}
                            component={VolunteerWaitingS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false}}
                            name={routerConstants.DASHBOARD}
                            component={DashboardS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_right'}}
                            name={routerConstants.VOLUNTEER_PROFILE}
                            component={VolunteerProfileS}
                        />
                        <RootStack.Screen
                            options={{headerShown: false, animation: 'slide_from_right', gestureEnabled: false}}
                            name={routerConstants.RESULT_WORK}
                            component={ResultWorkS}
                        />
                    </>
                }
                <RootStack.Screen
                    options={{headerShown: false, gestureEnabled: false, animation: 'fade_from_bottom', }}
                    name={routerConstants.LOGIN}
                    component={LoginS}
                />
                <RootStack.Screen
                    options={{headerShown: false, animation: 'slide_from_right'}}
                    name={routerConstants.REGISTRATION}
                    component={RegisterS}
                />
                <RootStack.Screen
                    options={{headerShown: false, animation: 'fade_from_bottom'}}
                    name={routerConstants.RESET_PASSWORD}
                    component={ResetPasswordS}
                />
                <RootStack.Screen
                    options={{headerShown: false, animation: 'flip', gestureEnabled: false}}
                    name={routerConstants.CHAT}
                    component={ChatS}
                />

            </RootStack.Navigator>
        </>
    );
});

export default RootNavigation;
