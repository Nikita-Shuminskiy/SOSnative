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
import {useFormik} from "formik";
import rootStore from "../../store/RootStore";
import {checkLanguage, validateEmail} from "../../utils/utils";
import {Checkbox} from "expo-checkbox";
import SocketStore from "../../store/SocketStore";
import {Box} from "native-base";
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '91939127177-6cm7j9l1siqavitqcv7hcr2kpbnm8tlp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '91939127177-o63v8uchocr821fpab1nodh16dsb0ol4.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
//91939127177-gkf26dd4kf4ug2olqb1d6l6k3uji5dae.apps.googleusercontent.com -- android client
type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}

const LoginS = ({navigation}: LoginSProps) => {
    const {AuthStoreService} = rootStore
    const {checkActiveSession} = SocketStore
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
    const onPressLogin = (values) => {
        AuthStoreService.login({
            email: values.email?.trim(),
            password: values.password,
            rememberMe: isRememberMe
        }).then((data) => {
            if (data) {
                checkActiveSession()
                navigation.navigate(data.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            }
        })
        setSubmitting(false)
    }
    const loginGoogle = async () => {
        try {
            const data = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            console.log(data)
            /*    const token = await AuthStoreService.authWithGoogle({
                    server_auth_code: userInfo.serverAuthCode,
                    id_token: userInfo.idToken,
                    language: selectedLanguage ?? 'en'
                })
                if (token) {
                    await OrdersStoreService.getSettingClient(navigation.navigate, true)
                }*/
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('IN_PROGRESS')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('PLAY_SERVICES_NOT_AVAILABLE')
            } else {
                console.log(error)
                // some other error happened
            }
        } finally {
        }
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
                        <Box mt={2}>
                            <Button
                                activeHover={true}
                                styleContainer={{borderWidth: 1, borderColor: colors.blue}}
                                styleText={{
                                    color: colors.blue, fontSize: 18,
                                }}
                                title={'Continue with Google'} onPress={loginGoogle}/>
                        </Box>
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
    imgIco: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    shadow: {
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 7,
    },
    styleContainerBtn: {
        maxWidth: 343,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
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
