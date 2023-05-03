import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import logo from '../../assets/images/logoWitchWiFi.png'
import TextInput from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {LinearGradient} from "expo-linear-gradient";
import {useFormik} from "formik";
import AuthStore from "../../store/AuthStore/auth-store";


type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}


const LoginS = ({navigation}: LoginSProps) => {
    const { setAuth } = AuthStore
        const onSubmit = (values) => {
            /*AuthStoreService.login({
                email: values.login.trim(),
                password: values.password,
            })*/

            setSubmitting(false)
        }
        const {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, setSubmitting} =
            useFormik({
                initialValues: {
                    login: '',
                    password: '',
                },
                onSubmit: (values) => {
                    onSubmit(values)
                },
                validateOnChange: false,
                validateOnMount: false,
                validateOnBlur: false,
                validate: (values) => {
                    const errors = {}
                    if (!values.login) {
                        errors['login'] = true
                    }
                    if (values.password.length <= 3) {
                        errors['password'] = true
                    }
                    return errors
                },
            })


    return (

        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={styles.container}>
                <View
                    style={{justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 10, marginBottom: 30}}>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.textHeader}>Welcome!{"\n"}
                        Log in to your account</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput placeholder={'Email Address'} style={styles.input}/>
                        <TextInput placeholder={'Password'} style={styles.input}/>
                        <TouchableOpacity style={{marginTop: 20, marginBottom: 20, marginLeft: 10}}>
                            <Text style={{color: colors.blueMedium, fontSize: 18, fontFamily: 'Onest-medium'}}>Forgot my
                                password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>     setAuth(true)}>

                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={styles.button}>
                                <Text style={styles.text}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{marginTop: 20, marginBottom: 20, marginLeft: 10, alignItems: 'center'}}>
                            <Text style={{color: colors.blueMedium, fontSize: 18, fontFamily: 'Onest-medium'}}>
                                You don’t have an account yet?</Text>
                        </TouchableOpacity>
                        <Button styleContainer={{borderWidth: 1, borderColor: colors.blue}} styleText={{
                            color: colors.blue, fontFamily: 'Onest-medium', fontSize: 18,
                            lineHeight: 21
                        }} title={'Create an account'} onPress={() => {

                        }}/>
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
        borderRadius: 8,
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
    input: {},
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


export default LoginS;