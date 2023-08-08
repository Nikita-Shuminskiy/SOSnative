import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import userImg from '../../assets/images/user.png'
import volunteerImg from '../../assets/images/people2.png'
import Loaders from "react-native-pure-loaders";
import {MessageType} from "../../screen/commonScreen/Chat/types";

type ChatListType = {
    message: MessageType
    isVolunteer: boolean
    isSentByCurrentUser: boolean
    isTyping?: boolean
}
const ChatList = ({message, isVolunteer, isSentByCurrentUser, isTyping = false}: ChatListType) => {

    return (
        <View style={[ isSentByCurrentUser ? styles.chatBubbleRight : styles.chatBubbleLeft]}>
            <View style={{...styles.container, backgroundColor: isSentByCurrentUser ? '#4DB8D5' : '#7EA7D9'}}>
                {
                    !isTyping ? <>
                            <Text style={styles.text}>{message?.content}</Text>
                            {/*<Text style={styles.text}>{message?.createdAt}</Text>*/}
                            <Image style={{...styles.avatar}} source={isSentByCurrentUser
                                ? !isVolunteer ? userImg : volunteerImg : isVolunteer ? userImg : volunteerImg}/>
                        </>
                        : <>
                            <Loaders.Ellipses size={20} color={'white'}/>
                        </>
                }


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatBubbleRight: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '70%',
    },
    chatBubbleLeft: {
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        maxWidth: '70%',
    },
    container: {
        paddingHorizontal: 24,
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 262,
        marginBottom: 20
    },
    avatar: {width: 30, height: 30, position: "absolute", bottom: -5, right: -6},
    text: {color: colors.white, fontSize: 13, fontFamily: 'Onest-light',}

})

export default ChatList;
