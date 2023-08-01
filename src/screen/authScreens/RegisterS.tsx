import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {LinearGradient} from "expo-linear-gradient";
import ArrowBack from "../../components/ArrowBack";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png"
import Picker from "../../components/Picker";
import {Checkbox} from "expo-checkbox";
import ButtonGradient from "../../components/ButtonGradient";
import * as Localization from 'expo-localization';
import {routerConstants} from "../../constants/routerConstants";
import {useFormik} from "formik";
import {validateEmail} from "../../utils/utils";
import rootStore from "../../store/RootStore";
import {DataSignUpType} from "../../api/api";


const RegisterS = ({navigation}) => {
    const [role, setRole] = useState<'patient' | 'volunteer'>('patient')
    const checkLanguage = Localization.locale.includes('he')
    const {AuthStoreService} = rootStore

    const {handleChange, handleBlur, handleSubmit, touched, values, errors, isSubmitting, setSubmitting} =
        useFormik({
            initialValues: {
                email: '',
                password: '',
                name: '',
                role: 'patient',
                preferredLang: 'ru',
                confirmPassword: '',
            },
            onSubmit: (values) => {
                onPressLogin(values as DataSignUpType)
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
                if (!values.name) {
                    errors['name'] = true
                }
                if (!values.role) {
                    errors['role'] = true
                }
                if (!values.preferredLang) {
                    errors['preferredLang'] = true
                }
                if (values.password !== values.confirmPassword) {
                    errors['confirmPassword'] = true
                }
                return errors
            },
        })
    const onPressLogin = (values: DataSignUpType) => {
        const {name, password, preferredLang, email} = values
        AuthStoreService.register({
            name: name.trim(),
            password: password.trim(),
            preferredLang,
            email: email.trim(),
            role: role
        })
        setSubmitting(false)
    }
    const isDisabledBtn = () => isSubmitting ||
        !!(errors.confirmPassword && !values.confirmPassword) ||
        !!(errors.name && !values.name.trim()) ||
        !!(errors.email && !validateEmail(values.email.trim())) ||
        !!(errors.password && values.password.length <= 7) ||
        !!(errors.password && !values.password)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>

            <View style={styles.container}>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={styles.textHeader}>Create an account</Text>
                </View>

                <View
                    style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingHorizontal: 20}}>
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                            <ButtonGradient
                                styleTouchable={{marginRight: 10}}
                                styleGradient={styles.button}
                                colorsGradient={role == 'volunteer' ? ['#D5E3FE', '#D5E3FE'] : null}
                                styleText={styles.textBtn}
                                colorText={role === 'volunteer' ? colors.gray : colors.white}
                                btnText={'I need help'}
                                onPress={() => setRole('patient')}
                            />
                            <ButtonGradient
                                styleGradient={styles.button}
                                colorsGradient={role === 'patient' ? ['#D5E3FE', '#D5E3FE'] : null}
                                styleText={styles.textBtn}
                                colorText={role === 'patient' ? colors.gray : colors.white}
                                btnText={'I am a volunteer'}
                                onPress={() => setRole('volunteer')}
                            />
                        </View>
                    </View>

                    <View>
                        <TextInput errorText={'Enter a name'} error={!!(!values.name.trim() && errors.name)}
                                   onBlur={handleBlur('name')} onChangeText={handleChange('name')}
                                   value={values.name} placeholder={'Your name'} style={styles.input}/>
                        <Text style={[styles.textAnyName]}>You can use any name you want to
                            stay {"\n"} anonymous.</Text>

                        <TextInput errorText={'Email entered incorrectly'}
                                   error={!!(!validateEmail(values.email.trim()) && errors.email)}
                                   onBlur={handleBlur('email')} onChangeText={handleChange('email')}
                                   value={values.email} placeholder={'Email Address'} style={styles.input}/>
                        <TextInput errorText={'Password must contain at least 8 characters'}
                                   error={!!(!!errors.password &&
                                       values.password.length < 8)} onBlur={handleBlur('password')}
                                   onChangeText={handleChange('password')}
                                   value={values.password} placeholder={'Password'} style={styles.input}/>
                        <TextInput
                            errorText={'Passwords do not match'}
                            error={!!(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
                                (values.confirmPassword !== values.password && touched.confirmPassword)}
                            onBlur={handleBlur('confirmPassword')} onChangeText={handleChange('confirmPassword')}
                            value={values.confirmPassword} placeholder={'Confirm password'} style={styles.input}/>
                        <View style={styles.blockPicker}>
                            <Picker onValueChange={handleChange('preferredLang')}/>
                        </View>

                        <View style={{
                            flexDirection: checkLanguage ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                            <Checkbox value={true} color={colors.blue}
                                      style={{borderColor: colors.blue, borderRadius: 8, marginRight: 15}}/>

                            <View style={{
                                marginTop: 20, marginBottom: 20, marginLeft: 10,
                                flexDirection: checkLanguage ? 'row-reverse' : 'row'
                            }}>
                                <Text style={[styles.textAgree]}>
                                    I agree with{' '}
                                </Text>

                                <TouchableOpacity style={{borderBottomWidth: 1, borderColor: colors.blue}}>
                                    <Text style={styles.textAgree}>Terms and Conditions</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {/*// @ts-ignore */}
                        <TouchableOpacity disabled={isDisabledBtn()} onPress={handleSubmit}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={[{
                                    width: '100%', height: 67, alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 8,
                                }]}>
                                <Text style={[styles.text, {color: isDisabledBtn() ? 'red' : 'white'}]}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    textAgree: {color: colors.blue, fontSize: 18, fontFamily: 'Onest-light'},
    textBtn: {
        fontFamily: 'Onest-light',
        fontWeight: '500',
        fontSize: 18
    },
    blockPicker: {
        backgroundColor: '#D5E3FE',
        height: 67,
        width: 341,
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 20,
        borderRadius: 8,
    },
    textAnyName: {
        textAlign: 'left',
        marginTop: 5,
        marginLeft: 20,
        color: '#909597',
        fontSize: 14,
        fontFamily: 'Onest-light'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 53,
        width: 162,
    },
    text: {
        fontFamily: 'Onest-medium',
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        marginHorizontal: 20
    },
    input: {},
    textHeader: {
        fontFamily: 'Onest-medium',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '400',
        color: '#51658D',
        lineHeight: 37,
        marginTop: 10,
        marginBottom: 30
    },
})
export default RegisterS;
