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
import RegisterS from "../screen/authScreens/RegisterS";
import ResetPasswordS from "../screen/authScreens/ResetPasswordS";
import rootStore from "../store/RootStore/root-store";
import SocketStore from "../store/SocketStore/socket-store";
import VolunteerProfileS from "../screen/volounterScreens/VolunteerProfileS";
import ResultWorkS from "../screen/volounterScreens/ResultWorkS";
import ChatS from "../screen/commonScreen/Chat/ChatS";
import DashboardS from "../screen/volounterScreens/DashboardS";
import ProblemDescription from "../screen/patientScreens/ProblemDescription";
import BodyAssessmentS from "../screen/patientScreens/BodyAssessmentS";
import EmotionalStateS from "../screen/patientScreens/EmotionalStateS";
import UserProfileS from "../screen/patientScreens/UserProfileS";
import GoodbyePageS from "../screen/patientScreens/GoodbyePageS";
import * as Notifications from 'expo-notifications';
import {useBackgroundTime} from "../utils/hook/useBackgroundTime";
import * as Updates from "expo-updates"
import {usePermissions} from "../utils/hook/usePermissions";

const RootStack = createNativeStackNavigator()
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
const backgroundHandler = async (time: number) => {
    if (time >= 10) {
        await Updates.reloadAsync()
    }
}
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {isAuth, user, redirectFromNotification, setRedirectFromNotification} = AuthStore
    const {setNavigation} = SocketStore
    const {AuthStoreService} = rootStore
   // useNotification()

    const {askNotificationPermissionHandler, notificationStatus} = usePermissions()

    useEffect(() => {
        if (redirectFromNotification) {
            //navigation.navigate(redirectFromNotification)
            setRedirectFromNotification('')
        }
    }, [redirectFromNotification])
    useBackgroundTime({backgroundHandler})
    useEffect(() => {
        if (notificationStatus !== 'granted') {
            askNotificationPermissionHandler()
        }
        AuthStoreService.getUser()
    }, []);

    return (
        <NavigationContainer
            ref={(navigationRef) => {
                setNavigation(navigationRef);
            }}
        >
            {isLoading === LoadingEnum.fetching && <Loading visible={true}/>}
            <RootStack.Navigator>
                {isAuth || user?.name ? (
                    user.role === 'volunteer' ?
                        <>
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.DASHBOARD}
                                component={DashboardS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.VOLUNTEER_PROFILE}
                                component={VolunteerProfileS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.RESULT_WORK}
                                component={ResultWorkS}
                            />
                        </>
                        : <>
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.NEED_HELP}
                                component={ProblemDescription}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.EVALUATION_CONDITION}
                                component={BodyAssessmentS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.EMOTIONAL_STATE}
                                component={EmotionalStateS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.USER_PROFILE}
                                component={UserProfileS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.GOODBYE}
                                component={GoodbyePageS}
                            />
                        </>
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
                <RootStack.Screen
                    options={{headerShown: false, animation: 'flip'}}
                    name={routerConstants.CHAT}
                    component={ChatS}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

export default RootNavigation;
