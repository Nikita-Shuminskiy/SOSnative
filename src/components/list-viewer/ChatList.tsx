import React, {memo, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";
import userImg from '../../assets/images/user.png'
import Loaders from "react-native-pure-loaders";
import {MessageType} from "../../screen/commonScreen/Chat/types";
import {Box, Text} from "native-base";
import {checkLanguage} from "../../utils/utils";
import ShowImagesModal from "../modal/ShowImagesModal";
import {SvgXml} from "react-native-svg";
import {IMG_TOOLBOX} from "../../screen/commonScreen/Chat/Footer/Constants";

type ChatListType = {
    message: MessageType
    isSentByCurrentUser: boolean
    isTyping?: boolean
    avatar?: string
}
const ChatList = memo(({message, isSentByCurrentUser, isTyping = false, avatar}: ChatListType) => {
    const [openImg, setOpenImg] = useState(false)
    const isTool =  message?.tool?.text
    const isBackColor = isTool ? colors[message.tool.color] : isSentByCurrentUser ? '#4DB8D5' : '#7EA7D9'
    return (
        <>
            <Box paddingX={0.5} paddingY={1.5} borderRadius={8}
                 alignSelf={isSentByCurrentUser ? 'flex-end' : 'flex-start'}>
                <Box p={isTyping ? 2 : 0} style={styles.container}
                     backgroundColor={isBackColor}>
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
                                    !message?.imageUrl &&
                                    <Box paddingX={5} paddingY={1} flexDirection={'row'} alignItems={'center'}
                                         justifyContent={'space-evenly'}>
                                        {
                                            message?.content && <Text style={styles.text}>{message.content.trim()}</Text>
                                        }
                                        {
                                            isTool && <>
                                                <Text style={styles.text}>{message.tool.text.trim()}</Text>
                                                {
                                                    message?.tool.image &&
                                                    <Box position={'relative'} left={2} backgroundColor={colors.white} borderRadius={50} p={1}>
                                                        <SvgXml xml={IMG_TOOLBOX[message?.tool.image]} width={15} height={15}/>
                                                    </Box>
                                                }
                                            </>
                                        }
                                    </Box>
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
        borderRadius: 12,
        alignItems: 'center'
    },
    avatar: {width: 25, height: 25, position: "absolute", bottom: -5, left: -12, borderRadius: 30},
    text: {
        color: colors.white, fontSize: 13, textAlign: checkLanguage ? 'right' : "left",
        fontWeight: 'normal',
        writingDirection: 'auto',
        flexWrap: 'wrap',
        width: 'auto',
    }

})

export default ChatList;
