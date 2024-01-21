import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
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
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {useGoBack} from "../../utils/hook/useGoBack";
import {Box} from "native-base";

type ProblemDescriptionProps = {
    navigation: NavigationProp<ParamListBase>
}
const ProblemDescription = observer(({navigation}: ProblemDescriptionProps) => {
    const {user, setDataPatient} = AuthStore
    const [description, setDescription] = useState('')
    const onPressHandler = () => {
        if (!description) return
        navigation.navigate(routerConstants.EVALUATION_CONDITION)
        setDataPatient(description, 'description')
        setDescription('')
    }
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box paddingX={4}>
                    <TouchableOpacity onPress={() => navigation.navigate(routerConstants.USER_PROFILE)}
                                      style={styles.header}>
                        <Text style={styles.nameUser}>{user?.name}</Text>
                        {
                            userImages && <Image source={user?.avatar ? {uri: user.avatar} : userImages} alt={'logo'}
                                                 style={styles.logo}/>
                        }
                    </TouchableOpacity>
                    <Box mt={5}>
                        <Box flex={1} alignItems={'flex-start'}>
                            <Text style={styles.textHi}>Hi,{' '}{user?.name}!</Text>
                            <Text style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Text>
                        </Box>
                        <Box flex={1} alignItems={'center'}>
                            <TextInput value={description} onChangeText={setDescription} style={styles.input}
                                       placeholder={'I feel depressed...'}/>
                            <ButtonGradient
                                backgroundImage={btnBack}
                                styleGradient={styles.styleGradient}
                                styleText={{fontSize: 24}}
                                btnText={'I need help!'}
                                onPress={onPressHandler}
                            />
                        </Box>
                    </Box>
                </Box>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
})
const styles = StyleSheet.create({
    styleGradient: {
        width: 245,
        height: 140,
        borderRadius: 100
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
        borderRadius: 30,
        width: 34,
        height: 34
    },
    input: {
        marginBottom: 10
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
