import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import CurrentCondition from "../../../components/CurrentCondition";
import InputFieldsChat from "../../../components/InputFieldsChat";
import SocketStore from "../../../store/SocketStore/socket-store";

type FooterChatProps = {
    isVolunteer: boolean
    setShowNameJoined: (val: boolean) => void
}
const FooterChat = ({isVolunteer, setShowNameJoined}: FooterChatProps) => {
    const {
        dataRoom,
    } = SocketStore
    const onSendMessage = (message: string) => {
        SocketStore.sendMessage(message)
    };
    const onTypingHandler = () => {
        setShowNameJoined(false)
        SocketStore?.typingHandler()
    }
    return (
        <View style={{
            alignItems: 'center',
            height: isVolunteer ? 80 : 180,
            backgroundColor: 'rgba(223,233,255,0.97)'
        }}>
            {
                !isVolunteer && <>
                    <Text style={styles.text}>Your current condition</Text>
                    <CurrentCondition dataRoom={dataRoom}/>
                </>
            }
            <InputFieldsChat
                onTypingHandler={onTypingHandler}
                onSendMessage={onSendMessage}/>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#9BB5E9',
        fontFamily: 'Onest-light',
        fontSize: 13,
        textAlign: 'center'
    },
})

export default FooterChat;
