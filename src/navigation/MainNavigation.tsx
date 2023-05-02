import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import NeedHelpS from "../screen/mainScreens/NeedHelpS";
import EvaluationConditionS from "../screen/mainScreens/EvaluationConditionS";

const MainStack = createNativeStackNavigator()

const MainNavigation = ({navigation, route}) => {
    console.log(route)
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

        </MainStack.Navigator>
    )
}

export default MainNavigation
