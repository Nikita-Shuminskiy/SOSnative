import React, {useCallback, useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View} from "react-native";
import CurrentCondition from "../../../components/CurrentCondition";
import InputFieldsChat from "../../../components/InputFieldsChat";
import SocketStore, {DataJoinRoomType} from "../../../store/SocketStore/socket-store";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Box, Heading, HStack, Spinner} from "native-base";
import {useNetInfo} from "@react-native-community/netinfo";

type FooterChatProps = {
    isVolunteer: boolean
    onSendMessage: (text: string) => void
    joinedRoomData: DataJoinRoomType
}
const FooterChat = ({isVolunteer, joinedRoomData, onSendMessage}: FooterChatProps) => {
    const onTypingHandler = useCallback(() => {
        SocketStore?.typingHandler()
    }, [])
    return (
       <>

           <Box style={{
               height: isVolunteer ? 60 : 150,
               backgroundColor: 'rgba(223,233,255,0.97)'
           }}>

               {
                   !isVolunteer && <>
                       <Text style={styles.text}>Your current condition</Text>
                       <CurrentCondition joinRoom={joinedRoomData}/>
                   </>
               }
               <InputFieldsChat
                   onTypingHandler={onTypingHandler}
                   onSendMessage={onSendMessage}/>
           </Box>
       </>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#9BB5E9',
        fontSize: 13,
        textAlign: 'center'
    },
})

export default FooterChat;
