import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import userImg from '../../assets/images/user.png'
import volunteerImg from '../../assets/images/people2.png'
import Loaders from "react-native-pure-loaders";
import {MessageType} from "../../screen/commonScreen/Chat/types";
import {Box} from "native-base";
import {checkLanguage} from "../../utils/utils";
import {AudienceType} from "../../store/SocketStore/type";
import ShowImagesModal from "../modal/ShowImagesModal";

type ChatListType = {
    message: MessageType
    isSentByCurrentUser: boolean
    isTyping?: boolean
    avatar?: string
}
const ChatList = memo(({message, isSentByCurrentUser, isTyping = false, avatar}: ChatListType) => {
    const [openImg, setOpenImg] = useState(false)
    return (
        <>
            <Box paddingX={1} paddingY={2} borderRadius={8}
                 alignSelf={isSentByCurrentUser ? 'flex-end' : 'flex-start'}>
                <Box p={isTyping ? 2 : 0}  style={styles.container} backgroundColor={isSentByCurrentUser ? '#4DB8D5' : '#7EA7D9'}>
                    {
                        !isTyping ? <>
                                {
                                    message?.imageUrl &&
                                    <TouchableOpacity onPress={() => setOpenImg(true)}>
                                        <Image resizeMode={'cover'} source={{uri: message.imageUrl}}
                                               style={styles.imgContent}/>
                                    </TouchableOpacity>
                                }
                                {
                                    message?.content && <Text  style={styles.text}>{message.content}</Text>
                                }
                                {/*<Text style={styles.text}>{message?.createdAt}</Text>*/}
                                {
                                    !isSentByCurrentUser &&
                                    <Image style={styles.avatar} source={avatar ? {uri: avatar} : userImg}/>
                                }
                            </>
                            : <>
                                <Loaders.Ellipses size={20} color={'white'}/>
                            </>
                    }
                </Box>
            </Box>
            <ShowImagesModal image={message?.imageUrl} visible={openImg} onClose={() => {
                setOpenImg(false)
            }}/>
        </>
    );
})

const styles = StyleSheet.create({
    imgContent: {
        width: 250,
        borderRadius: 16,
        height: 200
    },
    container: {
        borderRadius:12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0
    },
    avatar: {width: 25, height: 25, position: "absolute", bottom: -5, left: -12, borderRadius: 30},
    text: {
        color: colors.white, fontSize: 13, textAlign: checkLanguage ? 'right' : "left",
        fontWeight: 'normal',
        paddingHorizontal: 15,
        writingDirection: 'auto',
        flexWrap: 'wrap',
        width: 'auto',
        paddingVertical: 5,
    }

})

export default ChatList;
