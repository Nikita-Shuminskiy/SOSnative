import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import userImg from '../../assets/images/user.png'
import volunteerImg from '../../assets/images/people2.png'
import Loaders from "react-native-pure-loaders";
import {MessageType} from "../../screen/commonScreen/Chat/types";
import {Box} from "native-base";
import {checkLanguage} from "../../utils/utils";

type ChatListType = {
    message: MessageType
    isVolunteer: boolean
    isSentByCurrentUser: boolean
    isTyping?: boolean
}
const ChatList = ({message, isVolunteer, isSentByCurrentUser, isTyping = false}: ChatListType) => {

    return (
        <Box paddingX={3} paddingY={2} flex={1} borderRadius={8}
             alignSelf={isSentByCurrentUser ? 'flex-end' : 'flex-start'}>
            <View style={{...styles.container, backgroundColor: isSentByCurrentUser ? '#4DB8D5' : '#7EA7D9'}}>
                {
                    !isTyping ? <>
                            <Text style={styles.text}>{message?.content}</Text>
                            {/*<Text style={styles.text}>{message?.createdAt}</Text>*/}
                            {
                                !isSentByCurrentUser &&
                                <Image style={styles.avatar} source={isVolunteer ? userImg : volunteerImg}/>
                            }
                        </>
                        : <>
                            <Loaders.Ellipses size={20} color={'white'}/>
                        </>
                }


            </View>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0
    },
    avatar: {width: 25, height: 25, position: "absolute", bottom: -5, left: -12},
    text: {color: colors.white, fontSize: 13, textAlign: checkLanguage ? 'right' : "left"}

})

export default ChatList;
