import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import logo from '../../assets/images/logoWitchWiFi.png'
import TextInput from "../../components/TextInput";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {LinearGradient} from "expo-linear-gradient";
import AuthStore from "../../store/AuthStore/auth-store";
import {routerConstants} from "../../constants/routerConstants";
import * as Localization from "expo-localization";
import {useFormik} from "formik";
import rootStore from "../../store/RootStore";
import {validateEmail} from "../../utils/utils";


type LoginSProps = {
    navigation: NavigationProp<ParamListBase>
}

const LoginS = ({navigation}: LoginSProps) => {
    const {AuthStoreService} = rootStore
    const checkLanguage = Localization.locale.includes('he')
    const {setAuth} = AuthStore
    const {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting, setSubmitting} =
        useFormik({
            initialValues: {
                email: '2@mail.ru',
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
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput errorText={'Email entered incorrectly'}
                                   error={!!(!validateEmail(values.email.trim()) && errors.email)} onBlur={handleBlur('email')} onChangeText={handleChange('email')}
                                   value={values.email} placeholder={'Email Address'} style={styles.input}/>
                        <TextInput onBlur={handleBlur('password')} onChangeText={handleChange('password')}
                                   value={values.password}
                                   secureTextEntry={true}
                                   error={!!(!!errors.password &&
                                       values.password.length <= 7)}
                                   errorText={'Password must contain at least 8 characters'}
                                   placeholder={'Password'} style={styles.input}/>

                        <TouchableOpacity onPress={() => navigation.navigate(routerConstants.RESET_PASSWORD)}
                                          style={{marginTop: 20, marginBottom: 20, marginLeft: 10}}>
                            <Text style={{color: colors.blueMedium, fontSize: 18, fontFamily: 'Onest-light'}}>Forgot my
                                password</Text>
                        </TouchableOpacity>
                        {/*// @ts-ignore */}
                        <TouchableOpacity onPress={handleSubmit} disabled={isDisabledBtn()}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={styles.button}>
                                <Text style={[styles.text, {color: isDisabledBtn() ? 'red' : 'white'}]}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{marginTop: 20, marginBottom: 20, marginLeft: 10, alignItems: 'center'}}>
                            <Text style={{color: colors.blueMedium, fontSize: 18, fontFamily: 'Onest-light'}}>
                                You don’t have an account yet?</Text>
                        </TouchableOpacity>
                        <Button
                            activeHover={true}
                            styleContainer={{borderWidth: 1, borderColor: colors.blue}}
                            styleText={{
                                color: colors.blue, fontFamily: 'Onest-medium', fontSize: 18,
                                lineHeight: 21
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


/*
const Test = () => {
    const [recording, setRecording] = useState<Audio.Recording|null>(null);
    const [fftData, setFftData] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access audio was denied');
                return;
            }
            const recording = new Audio.Recording();
            try {
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setRecording(recording);
                const interval = setInterval(async () => {

                    const data = await recording.getTransformDataAsync(Audio.FFT_SIZE_MEDIUM);
                    setFftData(data);
                }, 100);
                return () => clearInterval(interval);
            } catch (error) {
                console.log('Error starting recording:', error);
            }
        })();
    }, []);

    const stopRecording = async () => {
        try {
            await recording?.stopAndUnloadAsync();
            setRecording(null);
        } catch (error) {
            console.log('Error stopping recording:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Frequency Plot</Text>
            <View style={styles.graph}>
                {fftData.map((value, index) => (
                    <View key={index} style={[styles.bar, { height: value * 100 }]} />
                ))}
            </View>
            {recording && (
                <TouchableOpacity onPress={stopRecording} style={styles.button}>
                    <Text style={styles.buttonText}>Stop Recording</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    graph: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '80%',
        height: '50%',
        backgroundColor: '#EEE',
        padding: 10,
    },
    bar: {
        width: 2,
        backgroundColor: 'blue',
    },
    button: {

        backgroundColor: 'red',
        padding: 10,
        marginTop: 90,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
*/
