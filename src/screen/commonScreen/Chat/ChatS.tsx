import React, {useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ChatAvatar from "../../../components/ChatAvatar";
import ChatList from "../../../components/list-viewer/ChatList";
import AuthStore from "../../../store/AuthStore/auth-store";
import SensePatient from "../../../components/SensePatient";
import {observer} from "mobx-react-lite";
import SocketStore from "../../../store/SocketStore";
import {createAlert} from "../../../components/alert";
import {routerConstants} from "../../../constants/routerConstants";
import SearchingVolunteerModal from "../../../components/modal/SearchingVolunteerModal";
import HeaderChat from './HeaderChat';
import FooterChat from "./FooterChat";
import {getInfoAboutInterlocutor} from "./utils";
import {MessageType} from "./types";


const ChatS = observer(({navigation}: any) => {
    const {user} = AuthStore
    const {
        socket,
        messages,
        dataRoom,
        joinedRoom,
        setJoinedRoom,
        setResultPatchedVolunteerData,
    } = SocketStore
    let typingTimeout;
    const isVolunteer = user?.role === 'volunteer'
    const scrollViewRef = useRef();
    const getInfo = getInfoAboutInterlocutor(joinedRoom, user)

    const [showNameJoined, setShowNameJoined] = useState(true);
    const [typingUser, setTypingUser] = useState<{ user: MessageType, isTyping: boolean } | null>(null);

    const roomsTimeoutHandler = () => {
        if (user.role === 'volunteer') return
        const onPressLeave = () => {
            navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
        }
        createAlert({
            title: 'Message',
            message: 'Time is running out, would you like to come out and appreciate?',
            buttons: [{text: 'Go to evaluation', style: "cancel", onPress: onPressLeave}, {
                text: 'Stay',
                style: "default"
            }]
        })
    }
    const findMessageHandler = (error, data: { data: MessageType[] }) => {
        SocketStore?.setMessages(data.data)
        setTypingUser(null);
    }
    const exitChatHandler = () => {
        const onPressLeave = () => {
            if (user?.role === 'volunteer') {
                SocketStore?.disconnectSocket(user?.id)
                navigation.goBack()
            } else {
                navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
            }
        }
        createAlert({
            title: 'Сообщение',
            message: 'Do you really want to leave the chat room?',
            buttons: [{text: 'Leave ', style: "cancel", onPress: onPressLeave}, {text: 'Stay', style: "default"}]
        })
    }
    const resetTypingState = () => {
        setTypingUser({...typingUser, isTyping: false});
    };

    useEffect(() => {
        if (socket) {
            socket.once('rooms timeout', roomsTimeoutHandler)
            socket.on('rooms patched', (data) => {
                if (user.role === 'volunteer') {
                    setResultPatchedVolunteerData(data)
                    navigation.navigate(routerConstants.RESULT_WORK)
                }
            })
            socket.on('rooms join', (data) => {
                if (!showNameJoined) {
                    setShowNameJoined(true)
                }
                if (user.role === 'volunteer') {
                    const checkPatient = data?.audience.find(el => el.role === 'patient')
                    if (!checkPatient) {
                        setTimeout(() => {
                            SocketStore?.disconnectSocket(user.id)
                            navigation.goBack()
                        }, 500)
                    }
                }
                setJoinedRoom(data)
            })
            socket.on('rooms typing', (data, err) => {
                if (data && data.id !== typingUser?.user?.id) {
                    setTypingUser({user: data, isTyping: true});
                    if (typingTimeout) {
                        clearTimeout(typingTimeout);
                    }

                    typingTimeout = setTimeout(resetTypingState, 1000);
                }
            })
            socket.emit('find', 'messages', {roomId: dataRoom?.id}, findMessageHandler);
        }
    }, [socket, user.id, showNameJoined])
    useEffect(() => {
        socket.on('messages created', (data) => {
            SocketStore?.setMessage(data)
        });

        return () => {
            socket.off('messages created')
        }
    }, [])


    useEffect(() => {
        if (scrollViewRef?.current) {
            // @ts-ignore
            scrollViewRef.current?.scrollToEnd({animated: true});
        }
    }, [messages, typingUser?.user?.id]);


    const chatView = ({item}: { item: MessageType }) => {
        const isSentByCurrentUser = item?.from?.id === user?.id;
        return <ChatList isVolunteer={isVolunteer}
                         isSentByCurrentUser={isSentByCurrentUser}
                         key={item?.id}
                         message={item}/>
    }
    return (
        <>
            <ScrollView style={{flex: 1, width: '100%'}}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                        ref={scrollViewRef}>
                <HeaderChat exitChatHandler={exitChatHandler} isVolunteer={isVolunteer} getInfo={getInfo} user={user}/>
                <LinearGradient
                    style={{flex: 1, width: '100%'}}
                    colors={['rgba(213,227,254,0.71)', 'rgba(223,233,255,0.97)']}
                    locations={[0.14, 0.8]}
                    start={{x: 0.1, y: 0.2}}
                >
                    <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
                        {isVolunteer && <SensePatient userJoin={getInfo} dataRoom={dataRoom}/>}
                        <ChatAvatar isVolunteer={isVolunteer} user={user}/>
                        <FlatList
                            data={messages}
                            renderItem={chatView}
                            style={{flex: 1}}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                        />
                        {joinedRoom?.joined?.name && showNameJoined && user.id !== joinedRoom.joined.id && (
                            <Text style={{...styles.text, textAlign: 'right'}}>
                                {joinedRoom.joined.name} entered the chat room
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
            <FooterChat isVolunteer={isVolunteer} setShowNameJoined={setShowNameJoined}/>
            {
                user.role === 'patient' && (getInfo?.id === user.id || !getInfo) &&
                <SearchingVolunteerModal onLeave={() => SocketStore?.disconnectSocket(user?.id)} navigation={navigation}
                                         visible={true}/>
            }

        </>
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
        fontFamily: 'Onest-light',
        fontSize: 13,
        textAlign: 'center'
    },
})


export default ChatS;
