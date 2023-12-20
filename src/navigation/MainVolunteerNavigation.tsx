import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {useEffect} from 'react'
import {routerConstants} from "../constants/routerConstants";
import ChatS from "../screen/commonScreen/Chat/ChatS";
import DashboardS from "../screen/volounterScreens/DashboardS";
import VolunteerProfileS from "../screen/volounterScreens/VolunteerProfileS";
import ResultWorkS from "../screen/volounterScreens/ResultWorkS";

const MainStack = createNativeStackNavigator()

const MainVolunteerNavigation = ({navigation, route}) => {
    return (
        <MainStack.Navigator  initialRouteName={routerConstants.DASHBOARD}>
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.VOLUNTEER_PROFILE}
                component={VolunteerProfileS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}
                name={routerConstants.RESULT_WORK}
                component={ResultWorkS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip'}}

                name={routerConstants.CHAT}
                component={ChatS}
            />
            <MainStack.Screen
                options={{headerShown: false, animation: 'flip',  }}
                name={routerConstants.DASHBOARD}
                component={DashboardS}
            />
        </MainStack.Navigator>
    )
}

export default MainVolunteerNavigation
