import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import PeoplesWitchElements from "../../assets/images/manWitchBrain.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";

const GoodbyePageS = ({navigation}) => {
    return (
        <BaseWrapperComponent isBackdrop={true} isKeyboardAwareScrollView={true} styleSafeArea={{marginTop: 0}}>
            <View style={{marginTop: Platform.OS === 'ios' ? 10 : 40, marginHorizontal: 30}}>
                <View style={{marginBottom: 100}}>
                    <ArrowBack styleTouchable={styles.arrowBack} img={arrowLeftImg}
                               goBackPress={() => navigation.goBack()}/>
                </View>
                <View>
                    <Text style={styles.textHeader}>Thank you!</Text>
                    <Text style={styles.text}>We've been through this together. Come back when you feel bad
                        again.</Text>

                    <View style={{marginTop: 60}}>

                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>

                    </View>
                    <Button styleContainer={{borderWidth: 1, borderColor: colors.white, marginTop: 60}} styleText={{
                        color: colors.white, fontFamily: 'Onest-light', fontSize: 18
                    }} title={'Ok, thanks'} onPress={() => {
                        navigation.navigate(routerConstants.NEED_HELP)
                    }}/>


                </View>
            </View>
        </BaseWrapperComponent>
    );
};

const styles = StyleSheet.create({
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