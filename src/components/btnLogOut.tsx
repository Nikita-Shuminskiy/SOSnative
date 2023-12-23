import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import logoutImages from "../assets/images/logout.png";
import {checkLanguage} from "../utils/utils";
import {colors} from "../assets/colors/colors";

type BtnLogOutProps = {
    onPressLogOut: () => void
}
const BtnLogOut = ({onPressLogOut}: BtnLogOutProps) => {
    return (
        <TouchableOpacity onPress={onPressLogOut} style={{
            ...styles.notificationsBlock,
            flexDirection: checkLanguage ? 'row-reverse' : 'row'
        }}>
            <Text style={styles.textNotification}>Logout</Text>
            <Image source={logoutImages}/>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    textNotification: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: '400',
    },
    notificationsBlock: {
        paddingHorizontal: 10,
        height: 67,
        width: 341,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#D5E3FE',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
export default BtnLogOut;