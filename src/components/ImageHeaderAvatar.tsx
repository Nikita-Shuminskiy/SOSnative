import React from 'react';
import {Image, View} from "react-native";
import {checkLanguage} from "../utils/utils";
import backgroundUserHeaderHe from "../assets/images/backgroundUserHeader-He.png";
import backgroundUserHeader from "../assets/images/backgroundUserHeader.png";
import userImg from "../assets/images/people2.png";
type ImageHeaderAvatarProps = {
    image?: string
}
const ImageHeaderAvatar = ({image}: ImageHeaderAvatarProps) => {
    return (
        <View>
            <Image style={{width: 85, height: 140}}
                   source={checkLanguage ? backgroundUserHeaderHe : backgroundUserHeader}/>
            <Image style={{width: 48, height: 48, borderRadius: 30, position: 'absolute', top: 50, left: 40}} source={image ? {uri: image} : userImg}/>
        </View>
    );
};

export default ImageHeaderAvatar;