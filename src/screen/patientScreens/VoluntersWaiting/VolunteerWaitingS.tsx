import React, {useCallback, useState} from 'react';
import {observer} from "mobx-react-lite";
import {NavigationProp} from "@react-navigation/native";
import {routerConstants} from "../../../constants/routerConstants";
import SearchingVolunteer from "../../../components/modal/SearchingVolunteer";
import SocketStore from "../../../store/SocketStore/socket-store";
import QuestionsTest from "./QuestionsTest";
import ColorTest from "./ColorTest";


type GameTestSProps = {
    navigation: NavigationProp<any>
    closeGameTest: () => void
}

const VolunteerWaitingS = observer(({navigation}: GameTestSProps) => {
    const {user, volunteerJoinedData} = SocketStore
    const [isOpenQuiz, setIsOpenQuiz] = useState(false)
    const [isOpenColorQuiz, setIsOpenColorQuiz] = useState(false)


    const onPressColorQuiz = () => {
        setIsOpenColorQuiz(true)
    }
    const onPressGoQuiz = () => {
        setIsOpenQuiz(true)
    }

    const onLeaveHandler = useCallback(() => {
        SocketStore?.forcedClosingSocket(user?.id)
        navigation.navigate(routerConstants.NEED_HELP)
    }, [])

    return (
        <>
            {
                isOpenQuiz ? <QuestionsTest closeTest={() => setIsOpenQuiz(false)}/> :
                    isOpenColorQuiz ? <ColorTest closeTest={() => setIsOpenColorQuiz(false)}/> :
                        <SearchingVolunteer navigation={navigation} onPressGoQuiz={onPressGoQuiz}
                                            volunteerJoinedData={volunteerJoinedData}
                                            onLeave={onLeaveHandler} onPressColorQuiz={onPressColorQuiz}/>
            }
        </>
    );
})
export default VolunteerWaitingS;
