import React from 'react';
import {ImageSourcePropType, Platform, SafeAreaView, StyleSheet, Text} from "react-native";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import {colors} from "../../assets/colors/colors";
import ArrowBack from "../../components/ArrowBack";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import SocketStore from "../../store/SocketStore/socket-store";
import Backdrop from "../../components/backdrop";
import SliderEmotionalState from "../../components/SliderEmotionalState";
import {observer} from "mobx-react-lite";
import ImageHeaderAvatar from "../../components/ImageHeaderAvatar";
import {checkLanguage} from "../../utils/utils";
import {Box} from "native-base";


export type ItemData = {
    id: number;
    title: string;
    description?: string
    img: ImageSourcePropType;
};

const EmotionalStateS = observer(({navigation, route}: any) => {
    const {setDataPatient, dataPatient, user} = AuthStore
    const {socketInit, socket} = SocketStore
    const {AuthStoreService} = rootStore
    const isFromChat = route.params?.fromChat
    const {
        setDataScoresAfterChat,
        setVolunteerEvaluation,
        volunteerJoinedData
    } = SocketStore
    const onValueSliderChange = (value) => {
        if (isFromChat) {
            setDataScoresAfterChat(value, 'resultConditionRate')
        } else {
            setDataPatient(value, 'conditionRate')
        }
    }
    const onPressBtnHandler = () => {
        3
        if (isFromChat) {
            socket?.connect()
            setVolunteerEvaluation(user?.id)
            navigation.navigate(routerConstants.GOODBYE)
            return
        }
        if (!isFromChat) {
            AuthStoreService.createRoom(dataPatient).then((data) => {
                console.log(!!data, 'dataCreate room')
                if (data) {
                    socketInit().then((data) => {
                        if (!!data) {
                            data.connect()
                            navigation.navigate(routerConstants.SEARCHING_VOLUNTEER)
                        }
                    })
                }
            })
            return
        }
    }
    return (
        <SafeAreaView style={{flex: 1, marginTop: Platform.OS === 'ios' ? 10 : 40}}>
            {!isFromChat && <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
            {
                isFromChat && <ImageHeaderAvatar image={volunteerJoinedData?.avatar}/>
            }
            <Box mt={2} paddingX={2} flex={1} justifyContent={'space-between'}>
                <Box position={'relative'} top={isFromChat ? 0 : 10}>
                    <Text style={styles.text}>Evaluate your condition using this scale</Text>
                </Box>
                <Box w={'100%'} h={95}>
                    <SliderEmotionalState onValueChange={onValueSliderChange}/>
                </Box>
                <ButtonGradient
                    styleTouchable={{marginBottom: 20}}
                    styleGradient={styles.button}
                    styleText={styles.textBtn}
                    btnText={isFromChat ? 'It’s ok' : 'Continue'}
                    onPress={onPressBtnHandler}
                />
            </Box>
            <Backdrop/>
        </SafeAreaView>
    );
})
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.blue,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8,
    },
    textBtn: {
        fontSize: 18,
        color: colors.white,
    },
})
export default EmotionalStateS;
