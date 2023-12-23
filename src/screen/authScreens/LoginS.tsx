import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import logo from '../../assets/images/logoWitchWiFi.png'
import TextInput from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {LinearGradient} from "expo-linear-gradient";
import {routerConstants} from "../../constants/routerConstants";
import * as Localization from "expo-localization";
import {useFormik} from "formik";
import rootStore from "../../store/RootStore";
import {checkLanguage, validateEmail} from "../../utils/utils";
import {Checkbox} from "expo-checkbox";
import {DataJoinRoomType} from "../../store/SocketStore/socket-store";
import SocketStore from "../../store/SocketStore";
import {Box} from "native-base";


type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}

const LoginS = ({navigation}: LoginSProps) => {
    const {AuthStoreService} = rootStore
    const {activeSessionCheck, setJoinedRoom, forcedClosingSocket} = SocketStore
    const [isRememberMe, setIsRememberMe] = useState(false)
    const {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, setSubmitting} =
        useFormik({
            initialValues: {
                email: '3@mail.ru',
                password: '11111111',
            },
            onSubmit: (values) => {
                onPressLogin(values)
            },
            validateOnChange: false,
            validateOnMount: false,
            validateOnBlur: false,
            validate: (values) => {
                const errors = {}
                if (!validateEmail(values.email)) {
                    errors['email'] = true
                }
                if (values.password.length <= 7) {
                    errors['password'] = true
                }
                return errors
            },
        })
    const connectToSocket = (userId) => {
        activeSessionCheck().then((socket) => {
            socket && socket?.once('rooms join', (data: DataJoinRoomType) => {
                if (data?.audience?.length) {
                    setJoinedRoom(data)
                    navigation?.navigate(routerConstants.CHAT)
                } else {
                    return forcedClosingSocket(userId)
                }
            })
        })
    }
    const onPressLogin = (values) => {
        AuthStoreService.login({
            email: values.email?.trim(),
            password: values.password,
            rememberMe: isRememberMe
        }).then((data) => {
            if (data) {
                connectToSocket(data.id)
                navigation.navigate(data.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            }
        })
        setSubmitting(false)
    }
    const isDisabledBtn = () => !!(errors.email && !validateEmail(values.email.trim())) ||
        !!(errors.password && values.password.length <= 7) ||
        isSubmitting

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: checkLanguage ? 'flex-start' : 'center',
                        marginTop: 10,
                        marginBottom: 30
                    }}>
                    <Image style={styles.logo} source={logo}/>
                    <Text style={styles.textHeader}>Welcome!{"\n"}
                        Log in to your account</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput errorText={'Email entered incorrectly'}
                                   error={!!(!validateEmail(values.email.trim()) && errors.email)}
                                   onBlur={handleBlur('email')} onChangeText={handleChange('email')}
                                   value={values.email} placeholder={'Email Address'} style={styles.input}/>
                        <TextInput isPassword={true} onBlur={handleBlur('password')}
                                   onChangeText={handleChange('password')}
                                   value={values.password}
                                   error={!!(!!errors.password &&
                                       values.password.length <= 7)}
                                   errorText={'Password must contain at least 8 characters'}
                                   placeholder={'Password'} style={styles.input}/>
                        <View style={styles.blockRememberMe}>
                            <Checkbox onValueChange={(value) => {
                                setIsRememberMe(value)
                            }} value={isRememberMe} color={colors.blue}
                                      style={styles.checkBox}/>
                            <Text style={{...styles.text, color: colors.blue, marginRight: 5}}>Remember me</Text>
                        </View>
                       <Box alignItems={'center'}>
                           <TouchableOpacity onPress={() => navigation.navigate(routerConstants.RESET_PASSWORD)}
                                             style={{marginTop: 20, marginBottom: 20, marginLeft: 10}}>
                               <Text style={{color: colors.blueMedium, fontSize: 18}}>Forgot my
                                   password</Text>
                           </TouchableOpacity>
                       </Box>


                        {/*// @ts-ignore */}
                        <TouchableOpacity onPress={handleSubmit} disabled={isDisabledBtn()}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={styles.button}>
                                <Text style={[styles.text, {color: isDisabledBtn() ? 'red' : 'white'}]}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View
                            style={{marginTop: 20, marginBottom: 20, marginLeft: 10, alignItems: 'center'}}>
                            <Text style={{color: colors.blueMedium, fontSize: 18}}>
                                You don’t have an account yet?</Text>
                        </View>
                        <Button
                            activeHover={true}
                            styleContainer={{borderWidth: 1, borderColor: colors.blue}}
                            styleText={{
                                color: colors.blue, fontSize: 18,
                            }}
                            title={'Create an account'} onPress={() => {
                            navigation.navigate(routerConstants.REGISTRATION)
                        }}/>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    checkBox: {borderColor: colors.blue, borderRadius: 8, marginRight: 5, width: 20, height: 20},
    blockRememberMe: {
        marginTop: 20,
        marginLeft: 10,
        flexDirection: checkLanguage ? 'row-reverse' : 'row',
        alignItems: 'center'
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8,
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
    input: {},
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


export default LoginS;
