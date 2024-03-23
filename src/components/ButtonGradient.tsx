import React, {memo, useRef} from 'react';
import {Animated, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/colors/colors';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

type ButtonGradientProps = {
    onPress: () => void;
    btnText: string;
    styleGradient?: StyleProp<ViewStyle>;
    styleTouchable?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    colorsGradient?: string[];
    colorText?: string;
    disabled?: boolean;
    backgroundImage?: ImageSourcePropType;
};

const ButtonGradient = ({
                            onPress,
                            btnText,
                            styleGradient,
                            styleText,
                            styleTouchable,
                            colorsGradient,
                            colorText,
                            disabled,
                            backgroundImage,
                        }: ButtonGradientProps) => {
    const opacityValue = useRef(new Animated.Value(0)).current;
    const handlePress = (toValue: number) => {
        Animated.timing(opacityValue, {
            toValue: toValue,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={1}
            onPress={() => onPress()}
            onPressIn={() => handlePress(1)}
            onPressOut={() => handlePress(0)}
            style={[styles.button, styleTouchable]}
        >
            <LinearGradient
                colors={colorsGradient ?? ['#89BDE7', '#7EA7D9']}
                style={[styles.gradient, styleGradient]}
            >
                <Text style={[styles.textBtn, {color: colorText ?? colors.white}, styleText]}>{btnText}</Text>
            </LinearGradient>
            {backgroundImage && (
                <Animated.Image
                    source={backgroundImage}
                    style={[styles.backgroundImg, {opacity: opacityValue}]}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    gradient: {width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'center',  height: 65},
    button: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImg: {
        position: 'absolute',
        width: 258,
        height: 165,
    },
    textBtn: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.white
    },
});

export default memo(ButtonGradient);
