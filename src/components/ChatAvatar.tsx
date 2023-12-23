import React, {memo} from 'react';
import {Image, StyleSheet, View} from "react-native";
import avatarMock from '../assets/images/user.png'
import AuthStore from "../store/AuthStore/auth-store";
import {UserType} from "../api/api";
import {audienceType} from "../store/SocketStore/socket-store";
import {Box} from "native-base";
type ChatAvatarProps = {
    user: UserType
    isVolunteer: boolean
    getInfo: audienceType
}
const ChatAvatar = memo(({getInfo}: ChatAvatarProps) => {
    return (
        <Box style={styles.container}>
            <Image style={styles.imgBig} source={{uri: getInfo?.avatar}}/>
           {/* <Image style={styles.imgSmall} source={{uri: getInfo?.avatar}}/>*/}
        </Box>
    );
})
const styles = StyleSheet.create({
    container: {width: '40%' , flex: 1, flexDirection: 'column'},
    imgBig: {width: 133, height: 133, borderRadius: 70},
    imgSmall: {width: 34, height: 34, position: 'absolute', top: 100, borderRadius: 70}

})
export default ChatAvatar;
