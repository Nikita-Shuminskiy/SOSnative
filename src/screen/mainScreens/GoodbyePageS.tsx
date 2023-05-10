import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import PeoplesWitchElements from "../../assets/images/manWitchBrain.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";
import {LinearGradient} from "expo-linear-gradient";

const GoodbyePageS = ({navigation}) => {
    return (
        <>
            <LinearGradient
                colors={['#89BDE7', '#7EA7D9']}
                style={{flex: 1, width: '100%'}}>

                <View style={{marginTop: Platform.OS === 'ios' ? 10 : 40, marginHorizontal: 30, flex: 1,
                    alignItems: 'center'}}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <ArrowBack styleTouchable={styles.arrowBack} img={arrowLeftImg}
                                   goBackPress={() => navigation.goBack()}/>
                    </View>

                   <View  style={{ flex: 8, width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                       <View style={{marginBottom: 30}}>
                           <Text style={styles.textHeader}>Thank you!</Text>
                           <Text style={styles.text}>We've been through this together. Come back when you feel bad
                               again.</Text>
                       </View>

                       <View style={{alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
                           <Image style={styles.imgPeople} source={PeoplesWitchElements}/>


                       </View>


                   </View>
                    <Button styleText={styles.textBtn} styleContainer={styles.btnContainer} title={'Ok, thanks'} onPress={() => {
                        navigation.navigate(routerConstants.NEED_HELP)
                    }}/>
                </View>
            </LinearGradient>


        </>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        flex: 1,
        borderWidth: 1,
        borderColor: colors.white, marginHorizontal: 20, marginVertical: 20},
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