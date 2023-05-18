import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import arrowLeftImgHe from "../../assets/images/keyboard_arrow_left-white.png";
import PeoplesWitchElements from "../../assets/images/manWitchBrain.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";
import {LinearGradient} from "expo-linear-gradient";
import * as Localization from "expo-localization";

const GoodbyePageS = ({navigation}) => {
    const checkLanguage = Localization.locale.includes('he')
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            style={{flex: 1, width: '100%'}}>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <ArrowBack  img={checkLanguage ? arrowLeftImgHe : arrowLeftImg}
                           goBackPress={() => navigation.goBack()}/>

                <View style={{
                    flex: 1,
                    marginHorizontal: 20,
                    marginVertical: 20,
                    alignItems: 'center',
                }}>


                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>

                        <View style={{marginBottom: 30}}>
                            <Text style={styles.textHeader}>Thank you!</Text>
                            <Text style={styles.text}>We've been through this together. Come back when you feel bad
                                again.</Text>
                        </View>

                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>

                    </View>
                    <Button  styleText={styles.textBtn} styleContainer={styles.btnContainer} title={'Ok, thanks'}
                            onPress={() => {
                                navigation.navigate(routerConstants.NEED_HELP)
                            }}/>
                </View>


            </BaseWrapperComponent>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        flex: 1,
        borderWidth: 1,
        borderColor: colors.white, marginHorizontal: 20, marginVertical: 20
    },
    textBtn: {
        textAlign: 'center',
        color: colors.white, fontFamily: 'Onest-medium', fontSize: 18, width: '100%'
    },
    imgPeople: {
        width: 334,
        height: 326
    },
    arrowBack: {
        marginTop: 0,
        marginLeft: 0,
        position: 'absolute',
        top: 10,
        left: -25
    },
    textHeader: {
        fontSize: 28,
        fontFamily: 'Onest-bold',
        color: colors.white,
        marginBottom: 15
    },
    text: {

        fontSize: 18,
        fontFamily: 'Onest-light',
        opacity: 0.5,
        color: colors.white,
    },
})

export default GoodbyePageS;