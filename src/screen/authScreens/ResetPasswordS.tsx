import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import logo from "../../assets/images/logoWitchWiFi.png";
import TextInput from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import {LinearGradient} from "expo-linear-gradient";
import ArrowBack from "../../components/ArrowBack";
import * as Localization from "expo-localization";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png"
import rootStore from "../../store/RootStore/root-store";
import {checkLanguage, validateEmail} from "../../utils/utils";

const ResetPasswordS = ({navigation}) => {
    const {AuthStoreService} = rootStore
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const onPressSendForgotPassword = () => {
        if (!validateEmail(email)) {
            setErrorEmail('Invalid email')
            return
        }
        AuthStoreService.forgotPassword(email.trim())
    }
    const onChangeTextEmailHandler = (text: string) => {
        setErrorEmail('')
        setEmail(text)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: 10,
                        marginBottom: 30
                    }}>
                    <Image
                        style={[styles.logo, {marginRight: checkLanguage ? 70 : 0, marginLeft: checkLanguage ? 0 : 70}]}
                        source={logo}/>
                    <Text style={styles.textHeader}>Reset password</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput errorText={errorEmail} error={!!errorEmail} value={email}
                                   onChangeText={onChangeTextEmailHandler}
                                   placeholder={'Email Address'} />

                        <TouchableOpacity style={styles.btn} onPress={onPressSendForgotPassword}>
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
    btn: {
        marginTop: 10
    },
    textHeader: {
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
