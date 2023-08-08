import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import avatarSmall from '../assets/images/people2.png'
import avatarBig from '../assets/images/Ellipse49.png'
import AuthStore from "../store/AuthStore/auth-store";
import {UserType} from "../api/api";
type ChatAvatarProps = {
    user: UserType
    isVolunteer: boolean
}
const ChatAvatar = ({user, isVolunteer}: ChatAvatarProps) => {
    return (
        <View style={styles.container}>
            <Image style={styles.imgBig} source={avatarBig}/>
            <Image style={styles.imgSmall} source={avatarSmall}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {width: '40%' , flex: 1, flexDirection: 'column', marginTop: 20,  marginBottom: 15 },
    imgBig: {width: 133, height: 133},
    imgSmall: {width: 34, height: 34, position: 'absolute', top: 100}

})
export default ChatAvatar;
