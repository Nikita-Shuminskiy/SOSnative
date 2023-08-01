import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import userImages from '../../assets/images/user.png'
import btnBack from '../../assets/images/btnBackground.png'
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {routerConstants} from "../../constants/routerConstants";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import * as Localization from 'expo-localization';
import AuthStore from "../../store/AuthStore/auth-store";

const NeedHelpS = ({navigation}) => {
    const checkLanguage = Localization.locale.includes('he')
    const {user, setDataPatient} = AuthStore
    const [description, setDescription] = useState('')

    const onPressHandler = () => {
        if (!description) return
        navigation.navigate(routerConstants.EVALUATION_CONDITION)
        setDataPatient(description, 'description')
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate(routerConstants.USER_PROFILE)}
                                      style={[styles.header, {
                                          justifyContent: checkLanguage ? 'flex-start' : 'flex-end'
                                      }]}>
                        <Text style={styles.nameUser}>{user?.name}</Text>
                        <Image source={userImages} style={styles.logo}/>
                    </TouchableOpacity>
                    <View style={styles.description}>
                        <View style={{
                            alignItems: 'flex-start',
                            flex: 1
                        }}>
                            <Text style={styles.textHi}>Hi, {user?.name}!</Text>
                            <Text style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TextInput value={description} onChangeText={setDescription} style={styles.input}
                                       placeholder={'I feel depressed...'}/>
                            <ButtonGradient
                                backgroundImage={btnBack}
                                styleGradient={{
                                    width: 265,
                                    height: 160,
                                    borderRadius: 100
                                }}
                                styleText={{fontSize: 24}}
                                btnText={'I need help!'}
                                onPress={onPressHandler}
                            />

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
    activeBtn: {
        shadowColor: "#85B9E3",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.23,
        shadowRadius: 12.81,
        elevation: 16,
        borderRadius: 18
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
    input: {
        marginBottom: 40
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
