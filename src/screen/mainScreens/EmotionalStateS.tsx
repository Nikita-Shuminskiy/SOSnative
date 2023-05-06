import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ImageSourcePropType} from "react-native";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import {colors} from "../../assets/colors/colors";
import ArrowBack from "../../components/ArrowBack";

import smileGood from '../../assets/images/smileGood.png'
import smileOk from '../../assets/images/smileOk.png'
import smileAverage from '../../assets/images/smileAverage.png'
import smileBad from '../../assets/images/smileBad.png'
import smileVeryBad from '../../assets/images/smileVeryBad.png'


type ItemData = {
    id: string;
    title: string;
    img: ImageSourcePropType;
};

const DATA: ItemData[] = [
    {
        id: '1',
        img: smileGood,
        title: 'I’m good',
    },
    {
        id: '2',
        img: smileOk,
        title: 'I’m ok',
    },
    {
        id: '3',
        img: smileAverage,
        title: 'Average',
    },
    {
        id: '4',
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: '5',
        img: smileVeryBad,
        title: 'I feel very bad',
    },
];

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    borderColor: string;
};

const Item = ({item, onPress, borderColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {
        borderColor: borderColor,
        borderWidth: borderColor ? 1 : 0,
        borderRadius: borderColor ? 9 : 0,
        width: 264, height: 78
    }]}>
        <Image style={styles.img} source={item.img}/>
        <Text style={[styles.textImg]}>{item.title}</Text>
    </TouchableOpacity>
);

const EmotionalStateS = ({navigation}) => {
    const [selectedId, setSelectedId] = useState<string>();


    const renderItem = ({item}: { item: ItemData }) => {
        const borderColor = item.id === selectedId ? colors.gray : '';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                borderColor={borderColor}
            />
        );
    };
    return (
        <BaseWrapperComponent>
            <ArrowBack goBackPress={() => navigation.goBack()}/>
            <View style={styles.container}>
                <View style={{marginTop: 30, marginBottom: 30}}>
                    <Text style={styles.text}>Evaluate your condition using this scale</Text>
                </View>

                <View>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                    />
                </View>

                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <ButtonGradient
                        styleTouchable={{flex: 1, width: '100%' }}
                        styleGradient={styles.button}
                        styleText={styles.textBtn}
                        btnText={'Continue'}
                        onPress={() => navigation.navigate(routerConstants.SEARCHING_VOLUNTEER)}
                    />
                </View>
            </View>
            <Backdrop/>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 30,
        //justifyContent: 'center'
    },

    blockImg: {
        flexDirection: "row",
        alignItems: 'center',
    },
    img: {
        width: 68,
        height: 68,
        marginRight: 20
    },
    textImg: {
        fontFamily: 'Onest-light',
        color: colors.blue,
        fontSize: 16
    },
    text: {
        fontSize: 24,
        fontFamily: 'Onest-medium',
        color: colors.blue,
    },
    container: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
        alignItems: 'center'
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8,
    },
    textBtn: {
        fontSize: 18,
        color: colors.white,
    },
})
export default EmotionalStateS;