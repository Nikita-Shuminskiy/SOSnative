import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import NeedHelpS from "../screen/patientScreens/NeedHelpS";
import EvaluationConditionS from "../screen/patientScreens/EvaluationConditionS";
import EmotionalStateS from "../screen/patientScreens/EmotionalStateS";
import SearchingVolunteerModal from "../components/modal/SearchingVolunteerModal";
import UserProfileS from "../screen/patientScreens/UserProfileS";
import ChatS from "../screen/commonScreen/Chat/ChatS";
import GoodbyePageS from "../screen/patientScreens/GoodbyePageS";

const MainStack = createNativeStackNavigator()

const MainPatientNavigation = ({navigation, route}) => {
    return (
        <MainStack.Navigator initialRouteName={routerConstants.NEED_HELP}>
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.NEED_HELP}
                component={NeedHelpS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.EVALUATION_CONDITION}
                component={EvaluationConditionS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.EMOTIONAL_STATE}
                component={EmotionalStateS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.USER_PROFILE}
                component={UserProfileS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.GOODBYE}
                component={GoodbyePageS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.CHAT}
                component={ChatS}
            />

        </MainStack.Navigator>
    )
}

export default MainPatientNavigation
