import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import NeedHelpS from "../screen/mainScreens/NeedHelpS";
import EvaluationConditionS from "../screen/mainScreens/EvaluationConditionS";
import EmotionalStateS from "../screen/mainScreens/EmotionalStateS";
import SearchingVolunteerS from "../screen/mainScreens/SearchingVolunteerS";
import UserProfileS from "../screen/mainScreens/UserProfileS";
import ChatS from "../screen/mainScreens/ChatS";
import GoodbyePageS from "../screen/mainScreens/GoodbyePageS";

const MainStack = createNativeStackNavigator()

const MainNavigation = ({navigation, route}) => {
    return (
        <MainStack.Navigator>
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
                name={routerConstants.SEARCHING_VOLUNTEER}
                component={SearchingVolunteerS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.USER_PROFILE}
                component={UserProfileS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.CHAT}
                component={ChatS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.GOODBYE}
                component={GoodbyePageS}
            />

        </MainStack.Navigator>
    )
}

export default MainNavigation
