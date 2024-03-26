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
import * as Animatable from "react-native-animatable";
type ProblemDescriptionProps = {
    navigation: NavigationProp<ParamListBase>
}
const ProblemDescription = observer(({navigation}: ProblemDescriptionProps) => {
    const {user, setDataPatient} = AuthStore
    const [description, setDescription] = useState('')
    const onPressHandler = () => {
        navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: false})
        setDataPatient(description ? description : 'I feel depressed...', 'description')
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
                        <Animatable.Text duration={2000} animation={'flipInY'} style={styles.nameUser}>{user?.name}</Animatable.Text>
                        {
                            userImages && <Image source={user?.avatar ? {uri: user.avatar} : userImages} alt={'logo'}
                                                 style={styles.logo}/>
                        }
                    </TouchableOpacity>
                    <Box mt={5}>
                        <Animatable.View flex={1} alignItems={'flex-start'}>
                            <Animatable.Text duration={1000} animation={'slideInLeft'} style={styles.textHi}>Hi,{' '}{user?.name}!</Animatable.Text>
                            <Animatable.Text duration={1000} animation={'slideInRight'} style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Animatable.Text>
                        </Animatable.View>
                        <Box flex={1} alignItems={'center'}>
                            <TextInput onSubmitEditing={onPressHandler} value={description}
                                       onChangeText={setDescription} style={styles.input}
                                       placeholder={'I feel depressed...'}/>
                            <Box mt={2}>
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
                </Box>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
})
const styles = StyleSheet.create({
    styleGradient: {
        zIndex: 999,
        width: 245,
        height: 140,
        borderRadius: 100
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
