import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import logo from "../../assets/images/logoWitchWiFi.png";
import TextInput from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import {LinearGradient} from "expo-linear-gradient";
import ArrowBack from "../../components/ArrowBack";

const ResetPasswordS = ({navigation}) => {
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack goBackPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View
                    style={{justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 10, marginBottom: 30}}>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.textHeader}>Reset password</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput placeholder={'Email Address'} style={styles.input}/>

                        <TouchableOpacity onPress={() => {}}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={styles.button}>
                                <Text style={styles.text}>Reset password</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8
    },
    text: {
        fontFamily: 'Onest-medium',
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    input: {
        marginBottom: 20
    },
    textHeader: {
        fontFamily: 'Onest-medium',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '400',
        color: '#51658D',
        lineHeight: 37,
        marginTop: 20
    },
    logo: {
        marginLeft: 70,
        width: 160,
        height: 124
    }
});
export default ResetPasswordS;