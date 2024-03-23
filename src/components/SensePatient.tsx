import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {checkLanguage, getCurrentConditionRateData} from "../utils/utils";
import {Box} from "native-base";
import {DataJoinRoomType} from "../store/SocketStore/type";
import * as Animatable from "react-native-animatable";

type SensePatientType = {
    joinedRoomData: DataJoinRoomType
    currentUserConditionRate: number
}
const SensePatient = memo(({joinedRoomData, currentUserConditionRate}: SensePatientType) => {
    const conditionRate = getCurrentConditionRateData(currentUserConditionRate ?? joinedRoomData?.room.conditionRate)

    return (
        <Box maxW={'45%'}>
            <View style={styles.container}>
                <View style={styles.blockText}>
                    {/* <Text ellipsizeMode={'middle'} numberOfLines={1} style={{color: colors.grayLight, fontSize: 12}}>{userJoin?.name}</Text>*/}
                    <Animatable.Text  animation={'tada'}
                                      duration={2000} style={{color: '#1F8298', fontSize: 12, textAlign: 'center', fontWeight: 'normal'}}>{conditionRate?.title}</Animatable.Text>
                </View>
                <Animatable.Image  animation={'tada'}
                                   duration={2000} style={styles.img} resizeMode={'contain'} alt="feel" source={conditionRate?.img}/>
            </View>
        </Box>
    );
})
const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomRightRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 5,
        height: 55,
        marginLeft: -10
    },
    blockText: {
        justifyContent: 'center'
    },
    img: {
        marginLeft: checkLanguage ? 2 : 0,
        width: 34,
        height: 34
    }
})
export default SensePatient;
