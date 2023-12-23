import React from 'react';
import {ImageSourcePropType, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
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


export type ItemData = {
    id: number;
    title: string;
    description?: string
    img: ImageSourcePropType;
};

const EmotionalStateS = observer(({navigation, route}: any) => {
    const {setDataPatient, dataPatient, user} = AuthStore
    const {socketInit} = SocketStore
    const {AuthStoreService} = rootStore
    const isFromChat = route.params?.fromChat
    const {
        setDataScoresAfterChat,
        setVolunteerEvaluation,
        forcedClosingSocket
    } = SocketStore
    const onValueSliderChange = (value) => {
        if (isFromChat) {
            setDataScoresAfterChat(value, 'resultConditionRate')
        } else {
            setDataPatient(value, 'conditionRate')
        }

    }
    const onPressBtnHandler = () => {3
        if (isFromChat) {
            setVolunteerEvaluation(user?.id)
            navigation.navigate(routerConstants.GOODBYE)
            return
        }
        if(!isFromChat) {
            AuthStoreService.createRoom(dataPatient).then((data) => {
               if(data) {
                   forcedClosingSocket(user.id)
                   setTimeout(() => {
                       socketInit().then((data) => {
                           if(!!data) {
                               navigation.navigate(routerConstants.CHAT)
                           }
                       })
                   }, 1)
               }
            })
            return
        }
    }
    return (
        <SafeAreaView style={{flex: 1, marginTop: Platform.OS === 'ios' ? 10 : 40}}>
            {!isFromChat && <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
            {
                isFromChat && <ImageHeaderAvatar image={user?.avatar}/>
            }
            <View style={styles.container}>
                <View style={{position: 'relative', top: isFromChat ? 0 : 10}}>
                    <Text style={styles.text}>Evaluate your condition using this scale</Text>
                </View>
                <View style={styles.emotionalStateBlock}>
                    <SliderEmotionalState onValueChange={onValueSliderChange}/>
                </View>
                <ButtonGradient
                    styleTouchable={{marginBottom: 20}}
                    styleGradient={styles.button}
                    styleText={styles.textBtn}
                    btnText={isFromChat ? 'It’s ok' : 'Continue'}
                    onPress={onPressBtnHandler}
                />
            </View>
            <Backdrop/>
        </SafeAreaView>
    );
})
const styles = StyleSheet.create({
    emotionalStateBlock: {
        width: '100%',
        height: 100
    },
    bodyContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    blockImg: {
        flexDirection: "row",
        alignItems: 'center',
    },
    img: {
        width: 68,
        height: 68,
        marginRight: 20
    },
    textImg: {
        marginRight: 20,
        color: colors.blue,
        fontSize: 16
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.blue,
    },
    container: {
        marginTop: 10,
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'space-between'
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
