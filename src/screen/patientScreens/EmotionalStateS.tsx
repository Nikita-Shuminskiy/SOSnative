import React, {useCallback} from 'react';
import {ImageSourcePropType, StyleSheet, Text} from "react-native";
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
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import * as Animatable from "react-native-animatable";
import smileBad from "../../assets/images/lottie/smileBad.json";
import smileGood from "../../assets/images/lottie/smileGood.json";
import smileOk from "../../assets/images/lottie/smileOk.json";
import smileNotGood from "../../assets/images/lottie/smileNotGood.json";
import smileAverege from "../../assets/images/lottie/smileAverege.json";
import LottieView from "lottie-react-native";

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
        volunteerJoinedData,
        dataScoresAfterChat
    } = SocketStore
    const onValueSliderChange = useCallback((value) => {
        if (isFromChat) {
            setDataScoresAfterChat(value, 'resultConditionRate')
        } else {
            setDataPatient(value, 'conditionRate')
        }
    }, [isFromChat])

    const onPressBtnHandler = () => {
        if (isFromChat) {
            socket?.connect()
            setVolunteerEvaluation(user?.id)
            navigation.navigate(routerConstants.GOODBYE)
            return
        }
        if (!isFromChat) {
            AuthStoreService.createRoom(dataPatient).then((data) => {
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
    const dataLottie = {
        '1': smileOk,
        '0': smileGood,
        '4': smileAverege,
        '7': smileNotGood,
        '10': smileBad,
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                {!isFromChat &&
                    <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
                {
                    isFromChat && <ImageHeaderAvatar image={volunteerJoinedData?.avatar}/>
                }
                <Animatable.View animation={'zoomInUp'} style={{flex: 1}}>
                    <Box mt={2} paddingX={2} flex={1} w={'100%'} justifyContent={'space-between'}>
                        <Box position={'relative'} top={isFromChat ? 0 : 10}>
                            <Text style={styles.text}>Evaluate your condition using this scale</Text>
                            {
                                !isFromChat && dataLottie[dataPatient?.conditionRate] && <Box alignItems={'center'}>
                                    <LottieView
                                        source={isFromChat ? dataLottie[dataScoresAfterChat?.resultConditionRate] : dataLottie[dataPatient.conditionRate]}
                                        style={{width: '100%', height: 150}} loop autoPlay/>
                                </Box>
                            }
                            {
                                isFromChat && dataLottie[dataScoresAfterChat?.resultConditionRate] &&
                                <Box alignItems={'center'}>
                                    <LottieView source={dataLottie[dataScoresAfterChat?.resultConditionRate]}
                                                style={{width: '100%', height: 150}} loop autoPlay/>
                                </Box>
                            }

                        </Box>
                        <Box w={'100%'}>
                            <SliderEmotionalState onValueChange={onValueSliderChange}/>
                        </Box>
                        <Box mb={2}>
                            <ButtonGradient
                                styleText={styles.textBtn}
                                btnText={isFromChat ? 'It’s ok' : 'Continue'}
                                onPress={onPressBtnHandler}
                            />
                        </Box>
                    </Box>
                </Animatable.View>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
})
const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.blue,
    },
    textBtn: {
        fontSize: 18,
        color: colors.white,
    },
})
export default EmotionalStateS;
