import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import TextInput from "./TextInput";
import {colors} from "../assets/colors/colors";
import ArrowUpImage from '../assets/images/arrowUpWitchBacground.png'
import Button from "./Button";
import SocketStore from "../store/SocketStore/socket-store";
import {Box} from "native-base";
import {checkLanguage} from "../utils/utils";

type InputFieldsChatProps = {
    onSendMessage: (message: string) => void
    onTypingHandler: () => void

}
const InputFieldsChat = ({onSendMessage, onTypingHandler}: InputFieldsChatProps) => {
    const [textInput, setTextInput] = useState<string>('')
    const onChangeText = (text: string) => {
        setTextInput(text)
        if (text) {
            onTypingHandler()
        }
    }

    const onPressSend = () => {
        onSendMessage(textInput)
        setTextInput('')
    }
    return (
        <Box backgroundColor={colors.white} paddingX={5} flexDirection={'row'} alignItems={'center'} flex={1} justifyContent={'space-evenly'} w={'100%'}>
            <TextInput multiline={true} inputMode={'text'} pointerEvents={'box-only'} value={textInput}
                       onChangeText={onChangeText} styleContainer={styles.styleInputContainer}
                       style={styles.input}/>
            {/*<TouchableOpacity>
                <Image style={{...styles.img, marginRight: 5}} source={microImg}/>
            </TouchableOpacity>*/}
            <TouchableOpacity style={styles.styleBtn} onPress={onPressSend}>
                <Image style={styles.img} source={ArrowUpImage}/>
            </TouchableOpacity>
        </Box>
    );
};
const styles = StyleSheet.create({
    styleBtn: {
        width: 30,
        height: 30,
    },
    styleInputContainer: {marginTop: 0, width: '100%'},
    container: {
        zIndex: 9999,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
    },
    img: {
        width: 30,
        height: 30,

    },
    input: {
        fontSize: 14,
        borderRadius: 24,
        backgroundColor: colors.blueLight,
        width: '93%',
        minHeight: 40,
        maxHeight: 37,
        paddingHorizontal: 16,
        paddingVertical: 7,
    },

})
export default InputFieldsChat;
