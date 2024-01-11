import React, {useState} from 'react';
import {KeyboardAvoidingView, Pressable, StyleProp, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Image} from "native-base";

type ButtonProps = {
    onPress: () => void
    styleContainer?: StyleProp<any>
    styleText?: StyleProp<any>
    title: string
}
const Button = ({
                    title,
                    onPress,
                    styleText,
                    onPressIn,
                    onPressOut,
                    activeOpacity,
                    styleContainer,
                    activeHover,
                    img
                }: any) => {
    const [activeBtn, setActiveBtn] = useState(false)
    return (
        <KeyboardAvoidingView behavior="padding">
            <TouchableOpacity onPressIn={() => setActiveBtn(true)}
                              onPressOut={() => setActiveBtn(false)}
                              style={{
                                  backgroundColor: activeHover && activeBtn ? '#D5E3FE' : 'rgba(213,227,254,0)',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 8,
                                  height: 66, ...styleContainer
                              }} activeOpacity={activeOpacity ?? 1}
                              onPress={onPress}>
                {
                    img &&
                    <Image w={10} h={10} mr={2} source={img} alt={'img'} />
                }
                <Text style={{
                    fontWeight: '500',
                    fontSize: 18,
                    ...styleText,
                }}>{title}</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({});
export default Button;
