import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import ovalImg from "../../assets/images/oval.png";
import userImg from "../../assets/images/people2.png";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../../assets/colors/colors";
import ChatAvatar from "../../components/ChatAvatar";
import ChatList from "../../components/list-viewer/ChatList";
import CurrentCondition from "../../components/CurrentCondition";
import InputFieldsChat from "../../components/InputFieldsChat";
import * as Localization from "expo-localization";
import AuthStore from "../../store/AuthStore/auth-store";
import SensePatient from "../../components/SensePatient";
import {observer} from "mobx-react-lite";
import SocketStore from "../../store/SocketStore";
import {TypingUserType} from "../../store/SocketStore/socket-store";
import {createAlert} from "../../components/alert";
import {routerConstants} from "../../constants/routerConstants";

/* useEffect(() => {
         setTimeout(() => {
             navigation.navigate(user.role === 'volunteer' ? routerConstants.RESULT_WORK : routerConstants.EVALUATION_CONDITION, {fromChat: true})
         }, 10000)
     }, [])*/
export type MessageType = {
    "content": string,
    "createdAt": string,
    "from": { "id": string, "name": string },
    "id": string
    roomId: string
    userName: string
}
const ChatS = observer(({navigation}: any) => {
    const {user} = AuthStore
    const {
        socket,
        messages,
        dataRoom
    } = SocketStore

    const isVolunteer = user?.role === 'volunteer'
    const checkLanguage = Localization.locale.includes('he')
    const scrollViewRef = useRef();
    const [currentUserTyping, setCurrentUserTyping] = useState<TypingUserType | null>(null)
    const onSendMessage = (message: string) => {
        SocketStore.sendMessage(message)
    };
    const roomsTimeoutHandler = () => {
        if(user.role === 'volunteer') return
        const onPressLeave = () => {
            navigation.navigate(user.role === 'volunteer' ? routerConstants.RESULT_WORK : routerConstants.EVALUATION_CONDITION, {fromChat: true})
        }
        createAlert({
            title: 'Сообщение',
            message: 'Time is running out, would you like to come out and appreciate?',
            buttons: [{text: 'Go to evaluation', style: "cancel", onPress: onPressLeave}, {text: 'Stay', style: "default"}]
        })
    }
    const onTypingHandler = () => {
        SocketStore?.typingHandler()
    }
    const findMessageHandler = (error, data: { data: MessageType[] }) => {
        SocketStore?.setMessages(data.data)
    }

    useEffect(() => {
        socket.once('rooms timeout', roomsTimeoutHandler)
        socket.on('messages created', (data) => {
            SocketStore?.setMessage(data)
        });
        socket.on('rooms patched', (err, data) => {
            console.log(data, 'rooms patched')
            console.log(err, 'rooms patched')
            if(user.role === 'volunteer') {
                navigation.navigate(routerConstants.RESULT_WORK)
            }
        })
        socket.on('rooms join', (err, data) => {
            console.log(data, 'rooms join')
            console.log(err, 'rooms join')
        })
        socket.on('rooms typing', (data, err) => {
            setCurrentUserTyping(data)
        })
        socket.emit('find', 'messages', {roomId: dataRoom?.id}, findMessageHandler);
        return () => {
            //SocketStore?.disconnectSocket(user?.id)
            // setCurrentUserTyping(null)
        };
    }, [])
    useEffect(() => {
        if (scrollViewRef.current) {
            // @ts-ignore
            scrollViewRef.current?.scrollToEnd({animated: true});
        }
    }, [messages]);
    const chatView = ({item}) => {
        const isSentByCurrentUser = item?.from?.id === user?.id;
        return <ChatList isVolunteer={isVolunteer} isSentByCurrentUser={isSentByCurrentUser} key={item?.id}
                         message={item as MessageType}/>
    }
    const wrapperAvatar = () => {
        return isVolunteer ? <View style={{flex: 1, alignItems: 'flex-end'}}>
            <ChatAvatar user={user}/>
        </View> : <ChatAvatar user={user}/>
    }
    const exitChatHandler = () => {

        const onPressLeave = () => {
            SocketStore?.disconnectSocket(user?.id)
            if(user.role === 'volunteer') {
                navigation.goBack()
            } else {
                navigation.navigate(routerConstants.NEED_HELP)
            }
        }
        createAlert({
            title: 'Сообщение',
            message: 'Do you really want to leave the chat room?',
            buttons: [{text: 'Leave ', style: "cancel", onPress: onPressLeave}, {text: 'Stay', style: "default"}]
        })

    }
    return (
        <ScrollView style={{flex: 1, width: '100%'}}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                    ref={scrollViewRef}
        >

            <LinearGradient
                colors={['#89BDE7', '#7EA7D9']}
                locations={[0.14, 0.8]}
                start={{x: 0.3, y: 0.2}}
                style={styles.headerContainer}>
                {
                    checkLanguage && <View style={{flexDirection: 'row-reverse'}}>
                        <ArrowBack styleTouchable={styles.right} img={arrowLeftImg}
                                   goBackPress={exitChatHandler}/>
                        <Text style={[styles.textHeader, {position: 'absolute', left: 0, top: 40}]}>
                            Chat with
                        </Text>
                        <View style={styles.blockImgInfo}>
                            <Image style={[styles.userImg, {marginLeft: 20}]} source={userImg}/>
                            <Text style={[styles.userNameText, {marginLeft: 10}]}>Jenny</Text>
                        </View>
                        <Image style={styles.userImgBackground} source={ovalImg}/>
                    </View>
                }
                {!checkLanguage && <View style={[styles.header]}>
                    <View style={{width: '100%', flex: 1}}>
                        <ArrowBack styleTouchable={styles.right} img={arrowLeftImg}
                                   goBackPress={exitChatHandler}/>
                        <Text style={styles.textHeader}>
                            Chat with
                        </Text>
                    </View>

                    <View>
                        <View style={styles.blockImgInfo}>
                            <Text style={styles.userNameText}>{user.name}</Text>
                            <Image style={styles.userImg} source={userImg}/>
                        </View>
                        <Image style={styles.userImgBackground} source={ovalImg}/>
                    </View>
                </View>}
            </LinearGradient>
            <LinearGradient
                style={{flex: 1, width: '100%'}}
                colors={['rgba(213,227,254,0.71)', 'rgba(223,233,255,0.97)']}
                locations={[0.14, 0.8]}
                start={{x: 0.1, y: 0.2}}
                //end={{x: 0, y: 1}}
            >
                <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
                    {isVolunteer && <SensePatient dataRoom={dataRoom}/>}
                    {wrapperAvatar()}

                    <FlatList
                        data={messages}
                        renderItem={chatView}
                        style={{flex: 1, padding: 16}}
                        /*   ListEmptyComponent={renderEmptyContainer}*/

                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                    />
                    {
                        currentUserTyping !== null &&
                        <Text style={{...styles.text, textAlign: 'right'}}>{currentUserTyping?.name} typing...</Text>
                    }
                </View>

                <View style={{alignItems: 'center'}}>
                    {
                        !isVolunteer && <>
                            <Text style={styles.text}>Your current condition</Text>
                            <CurrentCondition dataRoom={dataRoom}/>
                        </>
                    }
                    <InputFieldsChat setCurrentUserTyping={setCurrentUserTyping} onTypingHandler={onTypingHandler}
                                     onSendMessage={onSendMessage}/>
                </View>
            </LinearGradient>

        </ScrollView>
    );
});


const styles = StyleSheet.create({
    text: {
        color: '#9BB5E9',
        fontFamily: 'Onest-light',
        fontSize: 13,
        textAlign: 'center'
    },
    header: {width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    blockImgInfo: {width: '100%', flex: 1, flexDirection: 'row', marginRight: 25, marginTop: 15, alignItems: 'center'},
    userNameText: {
        color: colors.white,
        fontSize: 16
    },
    userImgBackground: {
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    userImg: {
        width: 68,
        height: 68,
        marginLeft: 10,
        marginBottom: 15
    },
    textHeader: {
        marginLeft: 25,
        fontSize: 24,
        fontWeight: '700',
        color: colors.white
    },
    headerContainer: {
        paddingTop: 30,
        width: '100%',
        minHeight: 126,
    },
    right: {},
})

export default ChatS;
/*
const messageJoinUser: MessageType = {
    id: joinRoom.user.id,
    content: `${joinRoom?.user?.name} typing`,
    from: {id: joinRoom?.user?.id, name: joinRoom?.user?.name},
    roomId: joinRoom.roomId,
    userName: 'Nick',
    createdAt: '1'
}*/
/*
;*/
/*
 socket.on('rooms typing', (err, data) => {
            console.log(data, 'rooms typing')
            console.log(err, 'rooms typing')
        })
socket.once('rooms join', (e, data) => {
    console.log(e, data, 'join')
    SocketStore?.userJoinIntoChatRoom(e, data)
});*/
/*
*      socket.once('rooms patched', SocketStore?.setVolunteerEvaluation)
* */
