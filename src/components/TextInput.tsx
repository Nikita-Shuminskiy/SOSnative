import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput as Input, TextInputProps} from "react-native";
import {colors} from "../assets/colors/colors";

type TextInputPropsType = TextInputProps & {}
const TextInput = ({style, ...rest}: TextInputPropsType) => {
    const [userName, setUserName] = useState('');
    return (
        <View style={styles.container}>
            <Input
                value={userName}
                onChangeText={(userName) => setUserName(userName)}
                placeholderTextColor={colors.blue}
                style={[styles.input, style]}
                {...rest}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    input: {
        padding: 20,
        width: 340,
        fontSize: 18,
        fontFamily: 'Onest-medium',
        color: colors.blue,
        height: 67,
        borderRadius: 8,
        backgroundColor: colors.blueLight
    },
});
export default TextInput;