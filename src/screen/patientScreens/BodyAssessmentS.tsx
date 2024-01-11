import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import bodyImg from '../../assets/images/Body.png'
import checkBodyImg from '../../assets/images/checkBody.png'
import checkBodyHeadImg from '../../assets/images/checkbodyHead.png'
import checkBodyHeadFalse from '../../assets/images/checkBodyHeadFalse.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import ArrowBack from "../../components/ArrowBack";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import AuthStore, {AfflictionType} from "../../store/AuthStore/auth-store";
import SocketStore from "../../store/SocketStore/socket-store";
import {checkLanguage} from "../../utils/utils";
import ImageHeaderAvatar from "../../components/ImageHeaderAvatar";
import {observer} from "mobx-react-lite";

type CheckEvaluationConditionType = {
    head: boolean,
    heart: boolean,
    stomach: boolean,
    leftHand: boolean,
    rightHand: boolean
}
const BodyAssessmentS = observer(({navigation, route}: any) => {
    const {setDataPatient, user} = AuthStore
    const isFromChat = route.params?.fromChat
    const {
        setDataScoresAfterChat,
        volunteerJoinedData
    } = SocketStore
    const [isChecked, setChecked] = useState<Partial<CheckEvaluationConditionType>>({
        head: false,
        heart: false,
        stomach: false,
        leftHand: false,
        rightHand: false
    });
    const getCheckedFields = () => {
        return Object.entries(isChecked)
            .filter(([key, value]) => value === true)
            .map(([key]: any) => key);
    };

    const onPressBtnHandler = () => {
        const currentActiveFields: AfflictionType[] = getCheckedFields()
        if (isFromChat) {
            setDataScoresAfterChat(currentActiveFields, 'resultAffliction')
        } else {
            setDataPatient(currentActiveFields, 'affliction')
        }
        navigation.navigate(routerConstants.EMOTIONAL_STATE, {fromChat: isFromChat})
    }
    const onTouchEndCheckedHandler = (key: keyof typeof isChecked) => {
        setChecked((prevState) => {
            return {
                ...isChecked,
                [key]: !prevState[key]
            }
        })
    }
    return (
        <>
            <BaseWrapperComponent styleSafeArea={{paddingTop: 0}} isKeyboardAwareScrollView={true}>
                {!isFromChat &&
                    <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
                {
                    isFromChat && <ImageHeaderAvatar image={volunteerJoinedData?.avatar}/>
                }
                <View style={styles.container}>
                    <View style={{marginTop: isFromChat ? 0 : 10}}>
                        <Text style={styles.text}>
                            {
                                isFromChat ? 'Chat is over. How do you feel now?' : 'Which part of your body is bothering you?'
                            }
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.img} source={bodyImg}/>
                        <View style={{marginTop: 10}}>
                            <View>
                                <Text
                                    style={[styles.textBody, styles.head, {color: isChecked.head ? colors.green : colors.blue}]}>head</Text>
                                {
                                    isChecked.head ?
                                        <Pressable style={{
                                            position: 'absolute', ...styles.checkboxHead,
                                            right: checkLanguage ? 84 : 86
                                        }} onTouchEnd={() => onTouchEndCheckedHandler('head')}>
                                            <Image

                                                source={checkBodyHeadImg}/>
                                        </Pressable>
                                        :
                                        <Pressable onTouchEnd={() => onTouchEndCheckedHandler('head')}>
                                            <Image style={{
                                                position: 'absolute', ...styles.checkboxHead,
                                                right: checkLanguage ? 84 : 86
                                            }}
                                                   source={checkBodyHeadFalse}/>
                                        </Pressable>

                                }
                            </View>
                            <View>
                                <Text
                                    style={[styles.textBody, styles.heart, {color: isChecked.heart ? colors.green : colors.blue}]}>heart</Text>
                                {
                                    isChecked.heart ?
                                        <Pressable style={{
                                            position: 'absolute', ...styles.checkboxHeart,
                                            right: checkLanguage ? 110 : 60
                                        }} onTouchEnd={() => onTouchEndCheckedHandler('heart')}>
                                            <Image style={{  width: 29, height: 29}} source={checkBodyImg}/>
                                        </Pressable>
                                        :
                                        <View onTouchEnd={() => onTouchEndCheckedHandler('heart')}
                                              style={{
                                                  position: 'absolute', ...styles.checkboxHeart, ...styles.checkbox,
                                                  right: checkLanguage ? 110 : 60
                                              }}/>

                                }
                            </View>
                            <View>
                                <Text
                                    style={[styles.textBody, styles.stomach, {color: isChecked.stomach ? colors.green : colors.blue}]}>stomach</Text>
                                {
                                    isChecked.stomach ?
                                        <Pressable style={{
                                            position: 'absolute', ...styles.checkboxStomach,
                                            right: checkLanguage ? 90 : 60
                                        }} onTouchEnd={() => onTouchEndCheckedHandler('stomach')}>
                                            <Image
                                                source={checkBodyImg}/>
                                        </Pressable>
                                        :
                                        <View onTouchEnd={() => onTouchEndCheckedHandler('stomach')}
                                              style={{
                                                  position: 'absolute', ...styles.checkboxStomach, ...styles.checkbox,
                                                  right: checkLanguage ? 90 : 60
                                              }}/>

                                }
                            </View>
                            <View>
                                <Text
                                    style={[styles.textBody, styles.hands, {color: isChecked.leftHand ? colors.green : colors.blue}]}>hands</Text>
                                {
                                    isChecked.leftHand ?
                                        <Pressable style={{position: 'absolute', ...styles.checkboxHandsLeft}}
                                                   onTouchEnd={() => onTouchEndCheckedHandler('leftHand')}>
                                            <Image style={{  width: 20, height: 20}} source={checkBodyImg}/>
                                        </Pressable>
                                        :
                                        <View onTouchEnd={() => onTouchEndCheckedHandler('leftHand')}
                                              style={{position: 'absolute', ...styles.checkboxHandsLeft, ...styles.checkbox}}/>

                                }
                                {
                                    isChecked.rightHand ?
                                        <Pressable style={{position: 'absolute', ...styles.checkboxHandsRight}}
                                                   onTouchEnd={() => onTouchEndCheckedHandler('rightHand')}>
                                            <Image style={{  width: 20, height: 20}} source={checkBodyImg}/>
                                        </Pressable>
                                        :
                                        <View onTouchEnd={() => onTouchEndCheckedHandler('rightHand')}
                                              style={{position: 'absolute', ...styles.checkboxHandsRight, ...styles.checkbox}}/>

                                }

                            </View>
                        </View>
                    </View>
                    <ButtonGradient
                        styleTouchable={{width: '100%', marginBottom: 10}}
                        styleGradient={styles.button}
                        styleText={styles.textBtn}
                        btnText={!isFromChat ? 'Continue' : 'Next step'}
                        onPress={onPressBtnHandler}
                    />
                </View>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
})


const styles = StyleSheet.create({
    isChecked: {
        backgroundColor: '#1F8298'
    },
    checkbox: {
        position: 'absolute',
        borderWidth: 0,
        backgroundColor: '#C1D6FF',
        borderRadius: 30,
    },
    checkboxHandsLeft: {
        width: 20,
        height: 20,
        top: 240,
        right: 172
    },
    checkboxHandsRight: {
        width: 20,
        height: 20,
        top: 240,
        right: 8
    },
    checkboxStomach: {
        top: 140,
        right: 70,
        width: 42,
        height: 42,
    },
    checkboxHead: {
        top: 0,
        right: 86,
        width: 31,
        height: 14,
    },
    checkboxHeart: {
        top: 100,
        right: 60,
        width: 29,
        height: 29,
    },
    hands: {
        top: 240,
        left: 10
    },
    stomach: {
        top: 150,
    },
    head: {
        right: 20
    },
    heart: {
        top: 100,
    },
    img: {
        width: 200,
        height: 520
    },
    imageContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    textBody: {
        position: 'absolute',
        fontWeight: 'normal',
        fontSize: 13,
        color: colors.blue
    },
    button: {
        height: 67,
        borderRadius: 8,
    },
    textBtn: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.blue,
    },
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

});
export default BodyAssessmentS;
