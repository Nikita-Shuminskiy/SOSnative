import React, {useCallback, useState} from 'react';
import {observer} from "mobx-react-lite";
import {NavigationProp} from "@react-navigation/native";
import {routerConstants} from "../../../constants/routerConstants";
import SearchingVolunteer from "../../../components/modal/SearchingVolunteer";
import SocketStore from "../../../store/SocketStore/socket-store";
import ColorTest from "./ColorTest";


type GameTestSProps = {
    navigation: NavigationProp<any>
    closeGameTest: () => void
}

const VolunteerWaitingS = observer(({navigation}: GameTestSProps) => {
    const {user, volunteerJoinedData} = SocketStore
    const [isOpenGameTest, setIsOpenGameTest] = useState(false)


    const onPressGoGameTest = () => {
        setIsOpenGameTest(true)
    }

    const onLeaveHandler = useCallback(() => {
        SocketStore?.forcedClosingSocket(user?.id)
        navigation.navigate(routerConstants.NEED_HELP)
    }, [])

    return (
        <>
            {
                isOpenGameTest ? <ColorTest closeTest={() => setIsOpenGameTest(false)}/> :
                    <SearchingVolunteer navigation={navigation} volunteerJoinedData={volunteerJoinedData}
                                        onLeave={onLeaveHandler} onPressGoGameTest={onPressGoGameTest}/>
            }
        </>
    );
})
export default VolunteerWaitingS;
