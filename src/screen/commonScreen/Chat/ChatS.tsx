import React, {useCallback, useMemo, useRef} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ChatAvatar from "../../../components/ChatAvatar";
import ChatList from "../../../components/list-viewer/ChatList";
import {observer} from "mobx-react-lite";
import SocketStore from "../../../store/SocketStore";
import {createAlert} from "../../../components/alert";
import {routerConstants} from "../../../constants/routerConstants";
import HeaderChat from './HeaderChat';
import FooterChat from "./Footer/FooterChat";
import {MessageType} from "./types";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import SensePatient from "../../../components/SensePatient";
import {useActivity} from "./hook/useActivity";
import {useGoBack} from "../../../utils/hook/useGoBack";
import {useKeepAwake} from "expo-keep-awake";
import {useSettingsChat} from "../../../utils/hook/useSettingsChat";
import {Reconnect} from "./Reconnect";
import {Box} from "native-base";
import {useTyping} from "./hook/useTyping";
import {MessagePayloadType} from "../../../store/SocketStore/type";
import {colors} from "../../../assets/colors/colors";

type ChatSProps = {
    navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({navigation}: ChatSProps) => {
    const scrollViewRef = useRef();
    const scrollToEnd = useCallback(() => {
        setTimeout(() => {
            // @ts-ignore
            scrollViewRef?.current && scrollViewRef.current?.scrollToEnd({animated: true});
        }, 20)
    }, [scrollViewRef])
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    useKeepAwake();
    const {
        user,
        socket,
        messages,
        sendMessage,
        joinedRoomData,
        currentUserConditionRate,
        getMessages,
        patientJoinedData,
        volunteerJoinedData,
        roomDisconnectInfo,
        setIsConnected,
        isConnected,
        toolboxVolunteer
    } = SocketStore
    useSettingsChat({
        socket,
        getMessages,
        role: user?.role,
        scrollToEnd,
        setIsConnected
    })
    const {typingUser} = useTyping({socket})
    const {
        showActivityInactive: showWhoEnteredTheChat,
        currentUser: currentUserEnteredTheChat
    } = useActivity(joinedRoomData?.joined)
    const {
        showActivityInactive: showWhoDisconnected,
        currentUser: currentUserDisconnectedTheChat
    } = useActivity(roomDisconnectInfo?.disconnected)

    const isVolunteer = useMemo(() => user?.role === 'volunteer', [user])
    const getInfoInterlocutor = isVolunteer ? patientJoinedData : volunteerJoinedData

    const exitChatHandler = useCallback(() => {
        const onPressLeave = () => {
            if (user?.role === 'volunteer') {
                socket?.off('rooms close')
                SocketStore?.forcedClosingSocket(user?.id)
                navigation?.goBack()
            } else {
                socket?.off('rooms close')
                socket?.off('rooms timeout')
                socket?.off('rooms disconnect')
                socket?.emit('rate', 'rooms')
                navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
            }
        }
        createAlert({
            title: 'Message',
            message: 'Do you really want to leave the chat room?',
            buttons: [{text: 'Leave ', style: "cancel", onPress: onPressLeave}, {text: 'Stay', style: "default"}]
        })
    }, [])
    const chatView = useCallback((message: MessageType) => {
        const isSentByCurrentUser = message?.from?.id === user?.id;
        return <ChatList isSentByCurrentUser={isSentByCurrentUser}
                         avatar={getInfoInterlocutor?.avatar}
                         key={message?.id}
                         message={message}/>
    }, [getInfoInterlocutor?.avatar])

    const onSendMessage = useCallback((payload: MessagePayloadType) => {
        sendMessage(payload)
        scrollToEnd()
    }, [scrollViewRef?.current])

    return (
     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                           style={{flex: 1}}
     >
         <HeaderChat exitChatHandler={exitChatHandler} getInfo={getInfoInterlocutor}/>
         <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
                 <ScrollView //style={{flex: 0, width: '100%'}}
                     style={{ backgroundColor: 'rgba(223,233,255,0.97)' }}
                     contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                     ref={scrollViewRef}>
                     <LinearGradient
                         style={{flex: 1, width: '100%'}}
                         colors={['rgba(213,227,254,0.71)', 'rgba(223,233,255,0.97)']}
                         locations={[0.14, 0.8]}
                         start={{x: 0.1, y: 0.2}}
                     >
                         <View style={{width: '100%', paddingHorizontal: 12}}>
                             {isVolunteer && <SensePatient currentUserConditionRate={currentUserConditionRate}
                                                           joinedRoomData={joinedRoomData}/>}
                             <Box mt={2} mb={2}>
                                 {getInfoInterlocutor?.avatar &&
                                     <ChatAvatar getInfo={getInfoInterlocutor} isVolunteer={isVolunteer} user={user}/>}
                             </Box>
                             {
                                 messages?.map((message) => {
                                     return chatView(message)
                                 })
                             }
                             {showWhoEnteredTheChat && currentUserEnteredTheChat?.role !== user?.role && (
                                 <Text style={styles.text}>
                                     {currentUserEnteredTheChat?.name} entered the chat room
                                 </Text>
                             )}
                             {showWhoDisconnected && currentUserDisconnectedTheChat?.role !== user?.role && (
                                 <Text style={styles.text}>
                                     User {currentUserDisconnectedTheChat?.name} logged out
                                 </Text>
                             )}
                             <View style={styles.typingBlock}>
                                 {typingUser?.isTyping && (
                                     <ChatList isSentByCurrentUser={typingUser.user?.from?.id === user.id}
                                               message={typingUser?.user}
                                               isTyping={true}/>
                                 )}
                             </View>
                         </View>
                         {!isConnected && <Reconnect/>}
                     </LinearGradient>
                 </ScrollView>
                 <FooterChat toolboxVolunteer={toolboxVolunteer} messagesLength={messages?.length}
                             onSendMessage={onSendMessage} joinedRoomData={joinedRoomData} isVolunteer={isVolunteer}/>

         </SafeAreaView>
     </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    typingBlock: {
        height: 70,
        flex: 1,
        width: '100%',
    },
    text: {
        color: '#9BB5E9',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'normal'
    },
})
export default ChatS;
