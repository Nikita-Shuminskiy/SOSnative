import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput as Input, TextInputProps, Image, TouchableOpacity} from "react-native";
import {colors} from "../assets/colors/colors";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {AntDesign} from "@expo/vector-icons";
import {checkLanguage} from "../utils/utils";

type TextInputPropsType = TextInputProps & {
    styleContainer?: StyleProp<TextStyle>
    error?: boolean
    errorText?: string
    isPassword?: boolean
}
const TextInput = ({style, styleContainer, error, errorText, isPassword, ...rest}: TextInputPropsType) => {
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(true)
    return (
        <View style={[styles.container, styleContainer]}>
            {
                isPassword &&
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
                                  style={[styles.icon, !checkLanguage && styles.right]}>
                    <AntDesign name={!showPassword ? "eyeo" : "eye"} size={30} color={colors.blue}/>
                </TouchableOpacity>
            }

            <Input
                secureTextEntry={isPassword && showPassword}
                value={userName}
                onChangeText={(userName) => setUserName(userName)}
                placeholderTextColor={colors.blue}
                style={[styles.input, style]}
                {...rest}
            />
            {
                error && <Text style={{color: 'gray', fontSize: 12}}>{errorText}</Text>
            }
        </View>
    );
};
const styles = StyleSheet.create({
    right: {
        right: 10,
        left: null,
    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 100,
    },
    container: {
        marginTop: 20,
    },
    input: {
        padding: 20,
        width: 340,
        fontSize: 18,
        fontFamily: 'Onest-light',
        color: colors.blue,
        height: 67,
        borderRadius: 8,
        backgroundColor: colors.blueLight
    },
});
export default TextInput;
