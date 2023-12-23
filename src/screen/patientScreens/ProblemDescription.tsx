import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import userImages from '../../assets/images/user.png'
import btnBack from '../../assets/images/btnBackground.png'
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {routerConstants} from "../../constants/routerConstants";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import AuthStore from "../../store/AuthStore/auth-store";
import {checkLanguage} from "../../utils/utils";

const ProblemDescription = ({navigation}) => {
    const {user, setDataPatient} = AuthStore
    const [description, setDescription] = useState('')
    const onPressHandler = () => {
        if (!description) return
        navigation.navigate(routerConstants.EVALUATION_CONDITION)
        setDataPatient(description, 'description')
        setDescription('')
    }
    useEffect(() => {
        navigation.navigate(routerConstants.EMOTIONAL_STATE)
    }, []);
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate(routerConstants.USER_PROFILE)}
                                      style={styles.header}>
                        <Text style={styles.nameUser}>{user?.name}</Text>
                        {
                            userImages && <Image source={userImages} alt={'logo'} style={styles.logo}/>
                        }

                    </TouchableOpacity>
                    <View style={styles.description}>
                        <View style={{
                            alignItems: 'flex-start',
                            flex: 1
                        }}>
                            <Text style={styles.textHi}>Hi,{' '}{user?.name}!</Text>
                            <Text style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TextInput value={description} onChangeText={setDescription} style={styles.input}
                                       placeholder={'I feel depressed...'}/>
                            <ButtonGradient
                                backgroundImage={btnBack}
                                styleGradient={styles.styleGradient}
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
    styleGradient: {
        width: 265,
        height: 160,
        borderRadius: 100
    },
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
        fontWeight: '500',
        marginBottom: 30,
        color: colors.blue
    },
    text: {
        fontWeight: '500',
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
        justifyContent: checkLanguage ? 'flex-start' : 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nameUser: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.blueLightMedium,
        marginRight: 12
    }
});

export default ProblemDescription;
