import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import NeedHelpS from "../screen/mainScreens/NeedHelpS";

const MainStack = createNativeStackNavigator()

const MainNavigation = ({navigation, route}) => {
    console.log(route)
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                options={{ headerShown: false, animation: 'flip' }}
                name={routerConstants.NEED_HELP}
                component={NeedHelpS}
            />
        </MainStack.Navigator>
    )
}

export default MainNavigation
