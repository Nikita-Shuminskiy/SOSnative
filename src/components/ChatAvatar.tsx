import React, {memo} from 'react';
import {Image, StyleSheet} from "react-native";
import {Box} from "native-base";
import {UserType} from "../api/type";
import {AudienceType} from "../store/SocketStore/type";

type ChatAvatarProps = {
    user: UserType
    isVolunteer: boolean
    getInfo: AudienceType
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
