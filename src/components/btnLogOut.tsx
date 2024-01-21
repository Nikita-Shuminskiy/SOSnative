import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from "react-native";
import logoutImages from "../assets/images/logout.png";
import {checkLanguage} from "../utils/utils";
import {colors} from "../assets/colors/colors";

type BtnLogOutProps = {
    onPressLogOut: () => void
    styleBtn?: StyleProp<ViewStyle>
    styleText?: StyleProp<TextStyle>
    image?: ImageSourcePropType
}
const BtnLogOut = ({onPressLogOut, styleBtn, image = logoutImages, styleText}: BtnLogOutProps) => {
    return (
        <TouchableOpacity onPress={onPressLogOut} style={[styles.btn, styleBtn]}>
            <Text style={[styles.textNotification, styleText]}>Logout</Text>
            {
                image && <Image source={image}/>
            }
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    textNotification: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: '400',
    },
    btn: {
        paddingHorizontal: 10,
        flexDirection: checkLanguage ? 'row-reverse' : 'row',
        height: 67,
        width: 341,
        borderRadius: 8,
        backgroundColor: colors.blueLight,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
export default BtnLogOut;