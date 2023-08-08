import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import bodyImg from '../../assets/images/Body.png'
import checkBodyImg from '../../assets/images/checkBody.png'
import checkBodyHeadImg from '../../assets/images/checkbodyHead.png'
import checkBodyHeadFalse from '../../assets/images/checkBodyHeadFalse.png'
import backgroundUserHeader from '../../assets/images/backgroundUserHeader.png'
import backgroundUserHeaderHe from '../../assets/images/backgroundUserHeader-He.png'
import userImg from '../../assets/images/people2.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import ArrowBack from "../../components/ArrowBack";
import * as Localization from "expo-localization";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import AuthStore, {afflictionType} from "../../store/AuthStore/auth-store";
import SocketStore from "../../store/SocketStore/socket-store";
type CheckEvaluationConditionType = {
    head: boolean,
    heart: boolean,
    stomach: boolean,
    leftHand: boolean,
    rightHand: boolean
}
const EvaluationConditionS = ({navigation, route}: any) => {
    const checkLanguage = Localization.locale.includes('he')
    const {setDataPatient} = AuthStore
    const isFromChat = route.params?.fromChat
    const {
        setDataScoresAfterChat
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
        const currentActiveFields: afflictionType[] = getCheckedFields()
        if (isFromChat) {
            setDataScoresAfterChat<afflictionType[]>(currentActiveFields, 'resultAffliction')
        } else {
            setDataPatient<afflictionType[]>(currentActiveFields, 'affliction')
        }
        navigation.navigate(routerConstants.EMOTIONAL_STATE, {fromChat: isFromChat ?? false})
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
           <BaseWrapperComponent isKeyboardAwareScrollView={true}>
               {!isFromChat && <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
               {
                   isFromChat && <View>
                       <Image style={{width: 95, height: 170}}
                              source={checkLanguage ? backgroundUserHeaderHe : backgroundUserHeader}/>
                       <Image style={{width: 68, height: 68, position: 'absolute', top: 50, left: 40}} source={userImg}/>
                   </View>
               }
               <View style={styles.container}>
                   <View style={{marginTop: isFromChat ? 0 : 40}}>
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

                               {
                                   isChecked.head ?
                                       <Pressable onTouchEnd={() => onTouchEndCheckedHandler('head')}>
                                           <Image style={{
                                               position: 'absolute', ...styles.checkboxHead,
                                               right: checkLanguage ? 84 : 86
                                           }}
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
                               <Text
                                   style={[styles.textBody, styles.head, {color: isChecked ? colors.green : colors.blue}]}>head</Text>
                           </View>
                           <View>

                               {
                                   isChecked.heart ?
                                       <Pressable onTouchEnd={() => onTouchEndCheckedHandler('heart')}>
                                           <Image style={{
                                               position: 'absolute', ...styles.checkboxHeart,
                                               right: checkLanguage ? 110 : 60
                                           }}
                                                  source={checkBodyImg}/>
                                       </Pressable>
                                       :
                                       <View onTouchEnd={() => onTouchEndCheckedHandler('heart')}
                                             style={{
                                                 position: 'absolute', ...styles.checkboxHeart, ...styles.checkbox,
                                                 right: checkLanguage ? 110 : 60
                                             }}/>

                               }
                               <Text
                                   style={[styles.textBody, styles.heart, {color: isChecked ? colors.green : colors.blue}]}>heart</Text>
                           </View>
                           <View>
                               {
                                   isChecked.stomach ?
                                       <Pressable onTouchEnd={() => onTouchEndCheckedHandler('stomach')}>
                                           <Image style={{
                                               position: 'absolute', ...styles.checkboxStomach,
                                               right: checkLanguage ? 90 : 60
                                           }}
                                                  source={checkBodyImg}/>
                                       </Pressable>
                                       :
                                       <View onTouchEnd={() => onTouchEndCheckedHandler('stomach')}
                                             style={{
                                                 position: 'absolute', ...styles.checkboxStomach, ...styles.checkbox,
                                                 right: checkLanguage ? 90 : 60
                                             }}/>

                               }
                               <Text
                                   style={[styles.textBody, styles.stomach, {color: isChecked ? colors.green : colors.blue}]}>stomach</Text>
                           </View>
                           <View>
                               <Text
                                   style={[styles.textBody, styles.hands, {color: isChecked ? colors.green : colors.blue}]}>hands</Text>

                               {
                                   isChecked.leftHand ?
                                       <Pressable onTouchEnd={() => onTouchEndCheckedHandler('leftHand')}>
                                           <Image style={{position: 'absolute', ...styles.checkboxHandsLeft}}
                                                  source={checkBodyImg}/>
                                       </Pressable>
                                       :
                                       <View onTouchEnd={() => onTouchEndCheckedHandler('leftHand')}
                                             style={{position: 'absolute', ...styles.checkboxHandsLeft, ...styles.checkbox}}/>

                               }
                               {
                                   isChecked.rightHand ?
                                       <Pressable onTouchEnd={() => onTouchEndCheckedHandler('rightHand')}>
                                           <Image style={{position: 'absolute', ...styles.checkboxHandsRight}}
                                                  source={checkBodyImg}/>
                                       </Pressable>
                                       :
                                       <View onTouchEnd={() => onTouchEndCheckedHandler('rightHand')}
                                             style={{position: 'absolute', ...styles.checkboxHandsRight, ...styles.checkbox}}/>

                               }

                           </View>
                       </View>
                   </View>
                   <ButtonGradient
                       styleTouchable={{flex: 1, width: '100%'}}
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
}


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
        top: 250,
        left: 10
    },
    stomach: {
        top: 150,
        left: 0
    },
    head: {
        right: 20
    },
    heart: {
        top: 100,
        left: -15
    },
    img: {
        width: 200,
        height: 520
    },
    imageContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 50
    },
    textBody: {
        position: 'absolute',
        fontFamily: 'Onest-light',
        fontSize: 15,
        color: colors.blue
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
        fontFamily: 'Onest-medium',
        color: colors.blue,
    },
    container: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        alignItems: 'center'
    },

});
export default EvaluationConditionS;
