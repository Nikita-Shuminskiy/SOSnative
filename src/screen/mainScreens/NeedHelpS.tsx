import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import userImages from '../../assets/images/user.png'
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {LinearGradient} from "expo-linear-gradient";
import * as Constants from "constants";
import {routerConstants} from "../../constants/routerConstants";
import Backdrop from "../../components/backdrop";

const NeedHelpS = ({navigation}) => {
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.nameUser}>Michael</Text>
                        <Image source={userImages} style={styles.logo}/>
                    </View>
                    <View style={styles.description}>
                        <View style={{   alignItems: 'flex-start',
                            flex: 1}}>
                            <Text style={styles.textHi}>Hi, Michael!</Text>
                            <Text style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TextInput style={styles.input} placeholder={'I feel depressed...'}/>
                            <TouchableOpacity onPress={() =>{
                                navigation.navigate(routerConstants.EVALUATION_CONDITION)
                            }}>
                                <LinearGradient
                                    colors={['#89BDE7', '#7EA7D9']}
                                    style={styles.button}>
                                    <Text style={styles.textBtn}>I need help!</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginRight: 20,
       marginLeft: 20,

    },
    button: {
        width: 265,
        height: 160,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
       /* shadowColor: "rgba(0,0,0,0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 100,

        elevation: 10,*/
    },
    input: {
        marginBottom: 40
    },
    textBtn: {
        color: colors.white,
        fontFamily: 'Onest-medium',
        fontSize: 24

    },
    description: {
        marginTop: 80
    },
    textHi: {
        fontSize: 24,
        fontFamily: 'Onest-medium',
        marginBottom: 30,
        color: colors.blue
    },
    text: {
        fontFamily: 'Onest-medium',
        color: colors.blue
    },
    logo: {
        width: 34,
        height: 34
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    nameUser: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.blueLightMedium,
        marginRight: 12
        //fontFamily: 'Inter'
    }
});

export default NeedHelpS;