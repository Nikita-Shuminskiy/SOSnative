import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {ItemData} from "../screen/patientScreens/EmotionalStateS";
import {RoomType} from "../api/api";
import {ConditionRateData} from "../utils/generalData";
import {getCurrentConditionRateData} from "../utils/utils";

const Item = ({item, onPress, borderColor}) => (
    <TouchableOpacity onPress={onPress} style={[{
        borderColor: borderColor,
        borderWidth: borderColor ? 2 : 0,
        borderRadius: borderColor ? 30 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 64, height: 64
    }]}>
        <Image style={styles.img} source={item.img}/>
    </TouchableOpacity>
);
type CurrentConditionType = {
    dataRoom: RoomType
}
const CurrentCondition = ({dataRoom}:CurrentConditionType ) => {
    const conditionRate = getCurrentConditionRateData(dataRoom?.conditionRate)
    const [selectedId, setSelectedId] = useState<number>(conditionRate?.id);
    const renderItem = ({item}: { item: ItemData }) => {
        const borderColor =  item.id === selectedId ? '#7EA7D9' : '';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                borderColor={borderColor}
            />
        );
    };
    return (
        <>

            <View style={styles.container}>

                <FlatList
                    data={ConditionRateData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                  /*  extraData={selectedId}*/
                    contentContainerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flex: 1
                    }}
                />
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10,
        flex: 1,
        width: '100%',
        height: 85,
        backgroundColor: '#D5E3FE',
        justifyContent: 'center',
    },
    img: {
        width: 54,
        height: 54
    }
})
export default CurrentCondition;
