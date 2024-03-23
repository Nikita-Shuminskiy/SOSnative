import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {checkLanguage, getCurrentConditionRateData} from "../../../../utils/utils";
import smileGood from "../../../../assets/images/coleredSmile/smileGood.png";
import smileOk from "../../../../assets/images/coleredSmile/smileOk.png";
import smileAverage from "../../../../assets/images/coleredSmile/smileAverege.png";
import smileBad from "../../../../assets/images/coleredSmile/smileBad.png";
import smileVeryBad from "../../../../assets/images/coleredSmile/smileVeryBad.png";
import {DataJoinRoomType} from "../../../../store/SocketStore/type";

const Item = ({item, onPress, borderColor}) => (
    <TouchableOpacity onPress={onPress} style={[{
        borderColor: borderColor,
        borderWidth: borderColor ? 2 : 0,
        borderRadius: borderColor ? 30 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 49, height: 49,
    }]}>
        <Image style={styles.img} source={item.img}/>
    </TouchableOpacity>
);
type CurrentConditionType = {
    joinRoom: DataJoinRoomType
}
const PatientDashboard = ({joinRoom}: CurrentConditionType) => {
    const conditionRate = getCurrentConditionRateData(joinRoom?.room.conditionRate)
    const [selectedId, setSelectedId] = useState<number>(conditionRate?.id);
    useEffect(() => {
        const selectedCondition = ConditionRateData.find(item => item.id?.includes(conditionRate?.id));
        setSelectedId(selectedCondition?.id[0])
    }, [conditionRate?.id])

    const renderItem = ({item} ) => {
        const borderColor = item.id?.includes(selectedId) ? '#7EA7D9' : '';
        const onPressSelectedRate = () => {
            //setSelectedId(item.id[0])
            //SocketStore?.sendSelectedRate(item.id)
        }
        return (
            <Item
                item={item}
                onPress={onPressSelectedRate}
                borderColor={borderColor}
            />
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={ConditionRateData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                /*  extraData={selectedId}*/
                style={{flex: 1, width: '100%'}}
                horizontal={true}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    flexDirection: checkLanguage ? 'row-reverse' : 'row',
                    justifyContent: 'space-evenly',
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 5,
        width: '100%',
        height: 65,
        backgroundColor: '#D5E3FE',
        justifyContent: 'space-between',
    },
    img: {
        width: 39,
        height: 39
    }
})
const ConditionRateData = [
    {
        id: [0],
        img: smileGood,
        title: 'I’m good',
    },
    {
        id: [1,2,3],
        img: smileOk,
        title: 'I’m ok',
    },
    {
        id: [4,5,6],
        img: smileAverage,
        title: 'Average',
    },
    {
        id: [7,8],
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: [10, 9],
        img: smileVeryBad,
        title: 'I feel very bad',
    },

];
export default PatientDashboard;
