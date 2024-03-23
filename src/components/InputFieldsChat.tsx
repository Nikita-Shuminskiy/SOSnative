import React, {memo, useState} from 'react';
import {Image, StyleSheet, I18nManager, Alert, TextInputProps} from "react-native";
import paperClippingImg from '../assets/images/paperСlippng.png'
import TextInput from "./TextInput";
import {colors} from "../assets/colors/colors";
import sendImg from '../assets/images/chat/send.png'
import * as ImagePicker from 'expo-image-picker'
import {Box} from "native-base";
import Link from "./Link";
import {MessagePayloadType} from "../store/SocketStore/type";
import {UploadScope} from "../api/type";
import rootStore from "../store/RootStore/root-store";
import {checkLanguage} from "../utils/utils";

type InputFieldsChatProps = TextInputProps & {
    onSendMessage: (payload: MessagePayloadType) => void
    onTypingHandler: () => void

}
const InputFieldsChat = memo(({onSendMessage, onTypingHandler, ...restProps}: InputFieldsChatProps) => {
    const [textInput, setTextInput] = useState<string>('')
    const {AuthStoreService} = rootStore
    const onChangeText = (text: string) => {
        setTextInput(text)
        if (text) {
            onTypingHandler()
        }
    }

    const onPressSend = () => {
        onSendMessage({content: textInput.trim()})
        setTextInput('')
    }
    const onGalleryHandler = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            return
        }
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.2,
                allowsEditing: false
            })
            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                AuthStoreService.sendUserPhoto(selectedAsset.uri, UploadScope.ROOMS, false).then((data) => {
                    if (!!data) {
                        onSendMessage({imageUrl: data?.path})
                    }
                })
            }
        } catch (error) {
        }
    }
    return (
        <Box backgroundColor={colors.white} paddingX={2} flexDirection={checkLanguage ? 'row-reverse' : 'row'}
             alignItems={'center'} flex={1}
             justifyContent={'space-between'} w={'100%'}>

            <TextInput multiline={false}
                       textAlign={checkLanguage ? 'right' : 'left'}
                       value={textInput}
                       returnKeyType={'send'}
                       autoCorrect={true}
                       onSubmitEditing={onPressSend}
                       onChangeText={onChangeText}
                       styleContainer={styles.styleInputContainer}
                       style={styles.input}
                       {...restProps}
            />
            {/*<TouchableOpacity>
                <Image style={{...styles.img, marginRight: 5}} source={microImg}/>
            </TouchableOpacity>*/}
            <Box flexDirection={'row'}>
                <Link styleImg={styles.img} styleLink={{...styles.styleBtn, marginRight: 20}}
                      img={paperClippingImg} onPress={onGalleryHandler}/>
                <Link styleImg={styles.img} styleLink={styles.styleBtn}
                      img={sendImg} onPress={onPressSend}/>
            </Box>
        </Box>
    );
})
const styles = StyleSheet.create({
    styleBtn: {
        width: 30,
        height: 30,
    },
    styleInputContainer: {marginTop: 0, width: '100%', flex: 1},
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
