import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import {colors} from "../../assets/colors/colors";
import backgroundUserHeader from '../../assets/images/backgroundUserHeader.png'
import backgroundUserHeaderHe from '../../assets/images/backgroundUserHeader-He.png'
import userImages from '../../assets/images/user.png'
import people from '../../assets/images/resultWorkPeople/resultWorkPeople.png'
import {
    checkLanguage,
    getAllDescriptions,
    getCurrentConditionRateData,
    getCurrentPeopleProblem,
} from "../../utils/utils";
import SocketStore from "../../store/SocketStore/socket-store";
import AuthStore from "../../store/AuthStore/auth-store";
import Backdrop from "../../components/backdrop";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box} from "native-base";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
type ResultWorkSProps = {
    navigation:  NavigationProp<ParamListBase>
    route: any
}
const ResultWorkS = observer(({navigation, route}: ResultWorkSProps) => {
    const {
        forcedClosingSocket,
        resultPatchedVolunteerData
    } = SocketStore
    const {user} = AuthStore

    const conditionRate = getCurrentConditionRateData(resultPatchedVolunteerData?.resultConditionRate ?? resultPatchedVolunteerData?.conditionRate)
    const getProblem = getCurrentPeopleProblem(resultPatchedVolunteerData?.resultAffliction ?? resultPatchedVolunteerData?.affliction)
    const currentAllDescriptions = getAllDescriptions(resultPatchedVolunteerData?.resultAffliction ?? resultPatchedVolunteerData?.affliction)
    const onPressBtnHandler = () => {
        forcedClosingSocket(user.id)
        navigation.navigate(routerConstants.DASHBOARD)
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box flex={1} w={'100%'}>
                    <View>
                        <Image style={{width: 95, height: 170}}
                               source={checkLanguage ? backgroundUserHeaderHe : backgroundUserHeader}/>
                        <Image style={{width: 68, height: 68, position: 'absolute', top: 50, left: 40}}
                               source={user?.avatar ? {uri: user.avatar} : userImages}/>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.text}>Chat is over. Here is the result of your work.</Text>
                        </View>
                        <View style={styles.bodyBlock}>
                            <View style={{flex: 1, width: '100%', alignItems: 'flex-start'}}>
                                {
                                    getProblem && getProblem.map((problem) => {
                                        return <View key={problem.id} style={[styles.dot, styles?.[problem.title]]}/>
                                    })
                                }
                                <Image style={{height: 209, width: 80}} source={people}/>
                            </View>
                            <View style={{flex: 2, width: '100%', alignItems: 'flex-start'}}>
                                <Text style={[styles.textUser, {
                                    marginBottom: 20,
                                    width: '90%'
                                }]}>{resultPatchedVolunteerData?.patient?.name}
                                    {' '}{currentAllDescriptions ? `feels pain in his ${currentAllDescriptions}` : 'doesn’t feel pain anywhere.'} </Text>
                                <Text style={styles.textUser}>Current condition:</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Image style={{height: 68, width: 68}} source={conditionRate?.img}/>
                                    <Text style={styles.textTitle}>{conditionRate?.title}</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.textGoodJob}>Good job!</Text>
                        <ButtonGradient
                            styleTouchable={{marginBottom: 20, width: '100%'}}
                            styleGradient={styles.button}
                            styleText={styles.textBtn}
                            btnText={'Return to the main screen'}
                            onPress={onPressBtnHandler}
                        />
                    </View>
                </Box>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
})
const styles = StyleSheet.create({
    rightHand: {
        width: 10,
        left: 2,
        top: 130,
    },
    leftHand: {
        width: 10,
        left: checkLanguage ? 68 : 68,
        top: 130,
    },
    dot: {
        zIndex: 10,
        position: 'absolute',
        borderRadius: 16,
        backgroundColor: '#1F8298',
        height: 10,
    },
    stomach: {
        width: 10,
        left: checkLanguage ? 20 : 50,
        top: 115,
    },
    heart: {
        width: 10,
        left: checkLanguage ? 20 : 55,
        top: 75,
    },
    head: {
        width: 20,
        left: 30,
        top: 15,

    },
    bodyBlock: {
        flex: 1,
        marginBottom: 10,
        marginHorizontal: 30,
        flexDirection: checkLanguage ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    textTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#51658D',
        marginLeft: 10
    },
    textGoodJob: {
        fontSize: 24,
        fontWeight: '500',
        color: '#1F8298',
        textAlign: 'center',
        marginBottom: 20
    },
    left: {
        marginTop: 0,
        marginLeft: 0,
        position: 'absolute',
        top: 0,
        left: 0
    },
    textUser: {fontSize: 15, fontWeight: '500', color: '#51658D'},
    right: {
        marginTop: 0,
        marginLeft: 0,
        position: 'absolute',
        top: 10,
        right: 0
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.blue,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
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
export default ResultWorkS;
