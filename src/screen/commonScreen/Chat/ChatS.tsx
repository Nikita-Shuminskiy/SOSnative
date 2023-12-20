import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, AppState, BackHandler} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ChatAvatar from "../../../components/ChatAvatar";
import ChatList from "../../../components/list-viewer/ChatList";
import AuthStore from "../../../store/AuthStore/auth-store";
import {observer} from "mobx-react-lite";
import SocketStore from "../../../store/SocketStore";
import {createAlert} from "../../../components/alert";
import {routerConstants} from "../../../constants/routerConstants";
import SearchingVolunteerModal from "../../../components/modal/SearchingVolunteerModal";
import HeaderChat from './HeaderChat';
import FooterChat from "./FooterChat";
import {getInfoAboutInterlocutor} from "./utils";
import {MessageType} from "./types";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import SensePatient from "../../../components/SensePatient";
import {useLoggedInChatUser} from "./hook";
import {StatusBar} from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";

type ChatSProps = {
    navigation: NavigationProp<ParamListBase>
}
const ChatS = observer(({navigation}: ChatSProps) => {
    const {user} = AuthStore
    const {
        socket,
        messages,
        sendMessage,
        joinedRoomData,
        currentUserConditionRate,
        activeSessionCheck,
        clearData
    } = SocketStore
    const getInfoInterlocutor = getInfoAboutInterlocutor(joinedRoomData, user)
    const {showWhoLoggedInChat} = useLoggedInChatUser(user, getInfoInterlocutor)
    let typingTimeout;
    const isVolunteer = user?.role === 'volunteer'
    const scrollViewRef = useRef();
    const [typingUser, setTypingUser] = useState<{ user: MessageType, isTyping: boolean } | null>(null);
    const [isConnectInternet, setIsConnectedInternet] = useState(true)
    useEffect(() => {
        if (!isConnectInternet) {
            clearData()
            const onPressLeave = () => {
                BackHandler.exitApp();
            }
            createAlert({
                title: 'Message',
                message: 'Unstable connection, check the internet',
                buttons: [{text: 'Exit', style: 'default', onPress: onPressLeave}]
            })
        }
        if (isConnectInternet && !socket) {
            activeSessionCheck().then((data) => {
                if (!data) {
                    navigation.navigate(user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                }
            })
        }
    }, [isConnectInternet]);
    const exitChatHandler = () => {
        const onPressLeave = () => {
            if (user?.role === 'volunteer') {
                socket.off('rooms close')
                SocketStore?.forcedClosingSocket(user?.id)
                navigation.goBack()
            } else {
                socket.off('rooms close')
                socket.off('rooms timeout')
                socket.off('rooms disconnect')
                socket.emit('rate', 'rooms')
                navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
            }
        }
        createAlert({
            title: 'Message',
            message: 'Do you really want to leave the chat room?',
            buttons: [{text: 'Leave ', style: "cancel", onPress: onPressLeave}, {text: 'Stay', style: "default"}]
        })
    }
    const resetTypingState = () => {
        setTypingUser({...typingUser, isTyping: false});
    };

    useEffect(() => {
        if (socket) {
            socket?.on('rooms typing', (data, err) => {
                if (data && data?.id !== typingUser?.user?.id) {
                    setTypingUser({user: data, isTyping: true});
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                    }
                    typingTimeout = setTimeout(resetTypingState, 1000);
                }
            })

        }
    }, [socket, user?.id])

    useEffect(() => {
        if (scrollViewRef?.current) {
            setTimeout(() => {
                // @ts-ignore
                scrollViewRef?.current && scrollViewRef.current?.scrollToEnd({animated: true});
            }, 1000)
        }
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnectedInternet(state.isConnected)
        });
        return () => {
            unsubscribe();
           //subscription.remove();
        };
    }, []);
    const chatView = (message: MessageType) => {
        const isSentByCurrentUser = message?.from?.id === user?.id;
        return <ChatList isVolunteer={isVolunteer}
                         isSentByCurrentUser={isSentByCurrentUser}
                         key={message?.id}
                         message={message}/>
    }
    const onLeaveHandler = () => {
        SocketStore?.forcedClosingSocket(user?.id)
        navigation.navigate(routerConstants.NEED_HELP)
    }
    const onSendMessage = (message: string) => {
        sendMessage(message)
        setTimeout(() => {
            // @ts-ignore
            scrollViewRef?.current && scrollViewRef.current?.scrollToEnd({animated: true});
        }, 1)
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                              style={{flex: 1}}>
            <StatusBar hidden={false} style={'auto'} animated={true} backgroundColor={'rgba(213,227,254,0.71)'}
                       translucent={false}/>
            <ScrollView style={{flex: 1, width: '100%'}}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                        ref={scrollViewRef}>
                <HeaderChat exitChatHandler={exitChatHandler} isVolunteer={isVolunteer} getInfo={getInfoInterlocutor}
                            user={user}/>
                <LinearGradient
                    style={{flex: 1, width: '100%'}}
                    colors={['rgba(213,227,254,0.71)', 'rgba(223,233,255,0.97)']}
                    locations={[0.14, 0.8]}
                    start={{x: 0.1, y: 0.2}}
                >
                    <View style={{width: '100%', paddingHorizontal: 12}}>
                        {isVolunteer && <SensePatient currentUserConditionRate={currentUserConditionRate}
                                                      joinedRoomData={joinedRoomData} userJoin={getInfoInterlocutor}/>}
                        <ChatAvatar isVolunteer={isVolunteer} user={user}/>
                        {
                            messages.map((message) => {
                                return chatView(message)
                            })
                        }
                        {showWhoLoggedInChat && (
                            <Text style={{...styles.text}}>
                                {getInfoInterlocutor?.name} entered the chat room
                            </Text>
                        )}

                        <View style={styles.typingBlock}>
                            {typingUser?.isTyping && (
                                <ChatList isVolunteer={!isVolunteer}
                                          isSentByCurrentUser={typingUser.user?.from?.id === user.id}
                                          message={typingUser?.user} isTyping={true}/>
                            )}
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
            <FooterChat onSendMessage={onSendMessage} joinedRoomData={joinedRoomData} isVolunteer={isVolunteer}/>
            <SearchingVolunteerModal onLeave={onLeaveHandler}
                                     navigation={navigation}
                                     visible={navigation.isFocused() && !!(user.role === 'patient' && !getInfoInterlocutor) && isConnectInternet}/>

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
        textAlign: 'center'
    },
})


export default ChatS;

/*const appState = useRef(AppState.currentState);
const [closeTimeout, setCloseTimeout] = useState<number | null>(null)*/
/*
const subscription = AppState.addEventListener('change', nextAppState => {
    if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
    ) {
        clearTimeout(closeTimeout)
        setCloseTimeout(null)
        getMessages();
        /!*if (!socket) {
            activeSessionCheck().then((data) => {
                if (!data) {
                    navigation.goBack()
                }
            })
        }*!/
    } else {
        if (!closeTimeout) {
            const id = +setTimeout(() => {
                forcedClosingSocket(user?.id)
                navigation.navigate(user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
                createAlert({
                    title: 'Message',
                    message: 'background alert, close chat after 9s min!',
                    buttons: [{text: 'Exit', style: 'default'}]
                })
            }, 3000)
            setCloseTimeout(id)
        }
    }
    appState.current = nextAppState;

});*/
