import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import TextInput from "./TextInput";
import {colors} from "../assets/colors/colors";
import microImg from '../assets/images/microWitchBackground.png'
import ArrowUpImage from '../assets/images/arrowUpWitchBacground.png'
import {TypingUserType} from "../store/SocketStore/socket-store";
import {JoinRoomType} from "../store/AuthStore/auth-store";

type InputFieldsChatProps = {
    onSendMessage: (message: string) => void
    onTypingHandler: () => void

}
const InputFieldsChat = ({ onSendMessage, onTypingHandler}: InputFieldsChatProps) => {
    const [textInput, setTextInput] = useState<string>('')
    const onChangeText = (text) => {
        setTextInput(text)
        if(text) {
            onTypingHandler()
        }
    }

    const onPressSend = () => {
        onSendMessage(textInput)
        setTextInput('')
    }
    return (
        <View style={styles.container}>
            <TextInput value={textInput} onChangeText={onChangeText} styleContainer={styles.styleInputContainer}
                       style={styles.input}/>
            {/*<TouchableOpacity>
                <Image style={{...styles.img, marginRight: 5}} source={microImg}/>
            </TouchableOpacity>*/}
            <TouchableOpacity style={styles.styleBtn} onPress={onPressSend}>
                <Image style={styles.img} source={ArrowUpImage}/>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    styleBtn: {
        zIndex: 9999,
        margin: 10
    },
    styleInputContainer: {marginTop: 0, height: 37, marginRight: 5},
    container: {
        zIndex: 9999,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    img: {
        width: 40,
        height: 40
    },
    input: {
        padding: 10,
        fontSize: 14,
        width: 243,
        height: 37
    },

})
export default InputFieldsChat;
