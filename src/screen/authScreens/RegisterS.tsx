import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {LinearGradient} from "expo-linear-gradient";
import ArrowBack from "../../components/ArrowBack";
import Picker from "../../components/Picker";
import {Checkbox} from "expo-checkbox";
import ButtonGradient from "../../components/ButtonGradient";

const RegisterS = ({navigation}) => {
const [isVolunteer, setIsVolunteer] = useState(true)

    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack goBackPress={() => navigation.goBack()}/>

            <View style={styles.container}>
                <View
                    style={{justifyContent: 'center', flex: 1, alignItems: 'center',}}>
                    <Text style={styles.textHeader}>Create an account</Text>
                    <View style={{flexDirection: 'row', marginHorizontal: 25}}>
                        <ButtonGradient
                            styleTouchable={{flex: 1, width: '100%'}}
                            styleGradient={styles.button}
                            colorsGradient={isVolunteer ? ['#D5E3FE', '#D5E3FE'] : null}
                            styleText={styles.textBtn}
                            colorText={isVolunteer ? colors.gray : colors.white}
                            btnText={'I need help'}
                            onPress={() => setIsVolunteer(false)}
                        />
                        <ButtonGradient
                            styleTouchable={{flex: 1, width: '100%'}}
                            styleGradient={styles.button}
                            colorsGradient={!isVolunteer ? ['#D5E3FE', '#D5E3FE'] : null}
                            styleText={styles.textBtn}
                            colorText={!isVolunteer ? colors.gray : colors.white}
                            btnText={'I am a volunteer'}
                            onPress={() => setIsVolunteer(true)}
                        />
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <TextInput placeholder={'Your name'} style={styles.input}/>
                        <Text style={styles.textAnyName} >You can use any name you want to stay {"\n"} anonymous.</Text>

                        <TextInput placeholder={'Email Adress'} style={styles.input}/>
                        <TextInput placeholder={'Password'} style={styles.input}/>
                        <TextInput placeholder={'Confirm password'} style={styles.input}/>
                        <View style={styles.blockPicker}>
                            <Picker/>
                        </View>

                      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                          <Checkbox value={true} color={colors.blue} style={{borderColor: colors.blue, borderRadius: 8}} />

                          <View style={{marginTop: 20, marginBottom: 20, marginLeft: 10, flexDirection: 'row'}}>
                              <Text style={[styles.textAgree]}>
                                  I agree with{' '}
                              </Text>

                              <TouchableOpacity style={{borderBottomWidth: 1, borderColor: colors.blue}}>
                                  <Text style={styles.textAgree}>Terms and Conditions</Text>
                              </TouchableOpacity>
                          </View>

                      </View>

                        <TouchableOpacity >
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={[styles.button, {width: '100%', height: 67}]}>
                                <Text style={styles.text}>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    textAgree:{color: colors.blue, fontSize: 18, fontFamily: 'Onest-light'},
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
        height: 53,
        width: 162,
        borderRadius: 8,
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
        marginBottom: 40
    },
    input: {
    },
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
} )
export default RegisterS;