import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../assets/colors/colors";
import {DATA, ItemData} from "../screen/mainScreens/EmotionalStateS";

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

const CurrentCondition = () => {
    const [selectedId, setSelectedId] = useState<string>();
    const renderItem = ({item}: { item: ItemData }) => {
        const borderColor = item.id === selectedId ? '#7EA7D9' : '';

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
                   data={DATA}
                   renderItem={renderItem}
                   keyExtractor={item => item.id}
                   extraData={selectedId}
                   contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1}}
               />
           </View>
       </>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
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