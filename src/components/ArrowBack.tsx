import React from 'react';
import {Image, ImageSourcePropType, ImageStyle, TouchableOpacity, ViewStyle} from "react-native";
import arrowLeftBlackImg from "../assets/images/arrow_left.png";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
type ArrowBackProps = {
    goBackPress: () => void,
    img?: ImageSourcePropType
    styleTouchable?: StyleProp<ViewStyle>
    styleImg?: StyleProp<ImageStyle>
}
const ArrowBack = ({goBackPress, img, styleTouchable, styleImg}: ArrowBackProps) => {
    return (
        <TouchableOpacity style={[{marginTop: 10, marginLeft: 10}, styleTouchable]} onPress={goBackPress}>
            <Image style={[{width: 31, height: 31}, styleImg]} source={img ?? arrowLeftBlackImg}/>
        </TouchableOpacity>
    );
};

export default ArrowBack;