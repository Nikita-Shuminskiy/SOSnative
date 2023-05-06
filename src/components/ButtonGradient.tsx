import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../assets/colors/colors";

type ButtonGradientProps = {
    onPress: () => void
    btnText: string
    styleGradient?: any
    styleTouchable?: any
    styleText?: any
    colorsGradient?: string[]
    colorText?: string
}
const ButtonGradient = ({
                            onPress,
                            btnText,
                            styleGradient,
                            styleText,
                            styleTouchable,
                            colorsGradient,
                            colorText
                        }: ButtonGradientProps) => {
    return (
        <TouchableOpacity style={{...styleTouchable}} onPress={onPress}>
            <LinearGradient
                colors={colorsGradient ?? ['#89BDE7', '#7EA7D9']}
                style={{...styles.button, ...styleGradient}}>
                <Text style={{...styles.textBtn, ...styleText, color: colorText ?? colors.white}}>{btnText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        /* shadowColor: "rgba(0,0,0,0.56)",
         shadowOffset: {
             width: 0,
             height: 5,
         },
         shadowOpacity: 0.34,
         shadowRadius: 100,

         elevation: 10,*/
    },

    textBtn: {
        fontFamily: 'Onest-light',
    },
})
export default ButtonGradient;