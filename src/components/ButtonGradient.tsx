import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../assets/colors/colors";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";

type ButtonGradientProps = {
    onPress: () => void
    btnText: string
    styleGradient?: any
    styleTouchable?: any
    styleText?: any
    colorsGradient?: string[]
    colorText?: string
    backgroundImage?: ImageSourcePropType
}

const ButtonGradient = ({
                            onPress,
                            btnText,
                            styleGradient,
                            styleText,
                            styleTouchable,
                            colorsGradient,
                            colorText,
                             backgroundImage
                        }: ButtonGradientProps) => {
    const [activeBtn, setActiveBtn] = useState(false)
    return (
        backgroundImage ? (
            <ImageBackground style={styles.backgroundImg} source={activeBtn ? backgroundImage : 0}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={() => setActiveBtn(true)}
                    onPressOut={() => setActiveBtn(false)} style={styleTouchable} onPress={onPress}>
                    <LinearGradient
                        colors={colorsGradient ?? ['#89BDE7', '#7EA7D9']}
                        style={{...styles.button, ...styleGradient}}>
                        <Text
                            style={{...styles.textBtn, ...styleText, color: colorText ?? colors.white}}>{btnText}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ImageBackground>
            ) : (
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={() => setActiveBtn(true)}
                onPressOut={() => setActiveBtn(false)} style={styleTouchable} onPress={onPress}>
                <LinearGradient
                    colors={colorsGradient ?? ['#89BDE7', '#7EA7D9']}
                    style={{...styles.button, ...styleGradient}}>
                    <Text
                        style={{...styles.textBtn, ...styleText, color: colorText ?? colors.white}}>{btnText}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )

    );
};
const styles = StyleSheet.create({
    backgroundImg: {
        width: 278,
        height: 180, justifyContent: 'center', alignItems: 'center'
    },
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
        fontFamily: 'Onest-medium',
    },
})
export default ButtonGradient;