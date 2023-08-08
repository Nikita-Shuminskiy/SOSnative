import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
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
    const onPressGoStart = () => {
        navigation.navigate(routerConstants.NEED_HELP)
    }
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            style={styles.container}>
            <BaseWrapperComponent styleSafeArea={{flex: 0}} isKeyboardAwareScrollView={true}>
                <ArrowBack  img={checkLanguage ? arrowLeftImgHe : arrowLeftImg}
                           goBackPress={onPressGoStart}/>
                <View style={styles.blockBody}>
                    <View style={styles.blockImg}>
                        <View style={{marginBottom: 30}}>
                            <Text style={styles.textHeader}>Thank you!</Text>
                            <Text style={styles.text}>We've been through this together. Come back when you feel bad
                                again.</Text>
                        </View>

                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>

                    </View>
                   <View  style={{ width: '100%'}}>
                       <Button  styleText={styles.textBtn} styleContainer={styles.btnContainer} title={'Ok, thanks'}
                                onPress={onPressGoStart}/>
                   </View>
                </View>
            </BaseWrapperComponent>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, width: '100%', justifyContent: 'flex-start'},
    blockImg: { width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20},
    blockBody: {
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
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
    right: {
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
