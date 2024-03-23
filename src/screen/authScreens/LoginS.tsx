import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
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
import {Box, Text} from "native-base";
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import googleImg from '../../assets/images/google.png'
import AuthWitchGoogleModal from "../../components/modal/AuthWitchGoogleModal";
import {RoleEnum} from "../../api/type";
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Animatable from "react-native-animatable";

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
    const [isAuthWitchGoogle, setIsAuthWitchGoogle] = useState(false)
    const [isAuthWitchApple, setIsAuthWitchApple] = useState(false)
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
            rememberMe: isRememberMe,
            strategy: 'local'
        }).then((data) => {
            if (data) {
                checkActiveSession()
                navigation.navigate(data.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            }
        })
        setSubmitting(false)
    }
    const loginGoogle = async (role: RoleEnum) => {
        setIsAuthWitchGoogle(false)
        try {
            const data = await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            AuthStoreService.login({
                strategy: 'google',
                role: role,
                accessToken: userInfo.idToken
            }).then((data) => {
                if (data) {
                    checkActiveSession()
                    navigation.navigate(data.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                }
            })
        } catch (error) {
        } finally {
        }
    }
    const isDisabledBtn = () => !!(errors.email && !validateEmail(values.email.trim())) ||
        !!(errors.password && values.password.length <= 7) ||
        isSubmitting
    const loginApple = async (role: RoleEnum) => {
        setIsAuthWitchApple(false)
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            AuthStoreService.login({
                strategy: 'apple',
                role: role,
                accessToken: credential.authorizationCode,
                user: {
                    email: credential.email,
                    fullName: credential.fullName,
                    identityToken: credential.identityToken
                }
            }).then((data) => {
                if (data) {
                    checkActiveSession()
                    navigation.navigate(data.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: checkLanguage ? 'flex-start' : 'center',
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                    <Animatable.Image animation={'tada'} easing={"ease-in"} iterationCount={2} style={styles.logo}
                                      source={logo}/>
                    <Animatable.Text duration={2000} animation={'slideInRight'} style={styles.textHeader}>Welcome!{"\n"}
                        Log in to your account</Animatable.Text>
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
                                <Text fontSize={18}
                                      fontWeight={'normal'}
                                      color={colors.blueMedium}>Forgot my password</Text>
                            </TouchableOpacity>
                        </Box>
                        {/*// @ts-ignore */}
                        <TouchableOpacity onPress={handleSubmit} disabled={isDisabledBtn()}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={[styles.button, {borderRadius: 8}]}>
                                <Text style={[styles.text, {color: isDisabledBtn() ? 'red' : 'white'}]}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View
                            style={{marginTop: 20, marginBottom: 20, marginLeft: 10, alignItems: 'center'}}>
                            <Text
                                fontSize={18}
                                fontWeight={'normal'}
                                color={colors.blueMedium}>
                                You don’t have an account yet?</Text>
                        </View>
                        <Button
                            activeHover={true}
                            styleContainer={{
                                borderWidth: 1,
                                borderColor: colors.blue,
                                backgroundColor: colors.white,
                                height: 60
                            }}
                            styleText={{
                                color: colors.blue, fontSize: 18,
                            }}
                            textBtn={'Create an account'} onPress={() => {
                            navigation.navigate(routerConstants.REGISTRATION)
                        }}/>
                        <Box mb={2} mt={2} flexDirection={'row'} justifyContent={'center'}>
                            <Box mr={2}>
                                <Button
                                    activeHover={true}
                                    styleContainer={styles.btnGoogle}
                                    styleText={{color: colors.blue, fontSize: 13}}
                                    img={googleImg}
                                    textBtn={''} onPress={() => setIsAuthWitchGoogle(true)}/>
                            </Box>
                            <Box>
                                {
                                    Platform.OS === 'ios' && <AppleAuthentication.AppleAuthenticationButton
                                        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                        cornerRadius={8}
                                        style={{
                                            width: 60,
                                            height: 60
                                        }}
                                        onPress={() => {
                                            setIsAuthWitchApple(true)
                                        }}
                                    />
                                }
                            </Box>
                        </Box>
                    </View>
                </View>
            </View>
            {
                isAuthWitchGoogle && <AuthWitchGoogleModal visible={isAuthWitchGoogle} onPress={loginGoogle}
                                                           onClose={() => setIsAuthWitchGoogle(false)}/>
            }
            {
                isAuthWitchApple && <AuthWitchGoogleModal visible={isAuthWitchApple} onPress={loginApple}
                                                          onClose={() => setIsAuthWitchApple(false)}/>
            }
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    btnGoogle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 60,
        width: 60,
        borderColor: colors.blue,
        backgroundColor: colors.white
    },
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
        height: 60,
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
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
