import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import imgGood from '../assets/images/smileGood.png'
import {RoomType} from "../api/api";
import {colors} from "../assets/colors/colors";
import {ConditionRateData} from "../utils/generalData";
import {checkLanguage, getCurrentConditionRateData} from "../utils/utils";
import {AudienceType} from "../store/AuthStore/auth-store";


type SensePatientType = {
    dataRoom: RoomType
    userJoin: AudienceType
}
const SensePatient = ({dataRoom, userJoin}: SensePatientType) => {
    const conditionRate = getCurrentConditionRateData(dataRoom?.conditionRate)

    return (
        <View style={styles.container}>
            <View style={styles.blockText}>
                <Text style={{color: colors.grayLight, fontSize: 12}}>{userJoin?.name}</Text>
                <Text style={{color: '#1F8298', fontSize: 14}}>{conditionRate?.title}</Text>
            </View>
            <Image style={styles.img} alt="feel" source={conditionRate?.img ?? imgGood}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomRightRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 130,
        paddingHorizontal: 10,
        marginLeft: -10
    },
    blockText: {
        flex: 1,
        justifyContent: 'center'
    },
    img: {
        marginLeft: checkLanguage ? 2 : 0,
        width: 38,
        height: 38
    }
})
export default SensePatient;
