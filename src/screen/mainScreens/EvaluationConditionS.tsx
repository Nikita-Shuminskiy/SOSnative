import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import bodyImg from '../../assets/images/Body.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import Checkbox from 'expo-checkbox';
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import ArrowBack from "../../components/ArrowBack";

const EvaluationConditionS = ({navigation}) => {
    const [isChecked, setChecked] = useState(false);
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack goBackPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View style={{marginTop: 40}}>
                    <Text style={styles.text}>Which part of your body is bothering you?</Text>
                </View>
                <View style={styles.imageContainer}>

                    <Image style={styles.img} source={bodyImg}/>

                    <View style={{marginTop: 10}}>
                        <Checkbox
                            style={[styles.checkbox, styles.checkboxHead]}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.blue : undefined}
                        />
                        <Text style={[styles.textBody, styles.head]}>head</Text>
                        <Text style={[styles.textBody, styles.heart]}>heart</Text>
                        <Checkbox
                            style={[styles.checkbox, styles.checkboxHeart]}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.blue : undefined}
                        />
                        <Text style={[styles.textBody, styles.stomach]}>stomach</Text>
                        <Checkbox
                            style={[styles.checkbox, styles.checkboxStomach]}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.blue : undefined}
                        />
                        <Text style={[styles.textBody, styles.hands]}>hands</Text>
                        <Checkbox
                            style={[styles.checkbox, styles.checkboxHandsLeft]}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.blue : undefined}
                        />
                        <Checkbox
                            style={[styles.checkbox, styles.checkboxHandsRight]}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? colors.blue : undefined}
                        />
                    </View>
                </View>
                <ButtonGradient
                    styleTouchable={{flex: 1, width: '100%'}}
                    styleGradient={styles.button}
                    styleText={styles.textBtn}
                    btnText={'Continue'}
                    onPress={() => navigation.navigate(routerConstants.EMOTIONAL_STATE)}
                />
            </View>
            <Backdrop/>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    checkbox: {
        position: 'absolute',
        borderWidth: 0,
        backgroundColor: '#C1D6FF',
        borderRadius: 20,
    },
    checkboxHandsLeft: {
        width: 20,
        height: 20,
        top: 240,
        right: 172
    },
    checkboxHandsRight: {
        width: 20,
        height: 20,
        top: 240,
        right: 8
    },
    checkboxStomach: {
        top: 140,
        right: 70,
        width: 42,
        height: 42,
    },
    checkboxHead: {
        top: 0,
        right: 86,
        width: 29,
        height: 29,
    },
    checkboxHeart: {
        top: 100,
        right: 60,
        width: 29,
        height: 29,
    },
    hands: {
        top: 250,
        left: 10
    },
    stomach: {
        top: 150,
        left: 0
    },
    head: {
        right: 20
    },
    heart: {
        top: 100,
        left: -15
    },
    img: {
        width: 200,
        height: 520
    },
    imageContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 50
    },
    textBody: {
        position: 'absolute',
        fontFamily: 'Onest-light',
        fontSize: 15,
        color: colors.blue
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8,
    },
    textBtn: {
        fontFamily: 'Onest-light',
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    text: {
        fontSize: 24,
        fontFamily: 'Onest-medium',
        color: colors.blue,
    },
    container: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        alignItems: 'center'
    },

});
export default EvaluationConditionS;