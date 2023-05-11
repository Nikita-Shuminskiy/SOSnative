import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ImageSourcePropType,
    ScrollView,
    SafeAreaView, Platform
} from "react-native";
import Backdrop from "../../components/backdrop";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import {colors} from "../../assets/colors/colors";
import ArrowBack from "../../components/ArrowBack";

import backgroundUserHeader from '../../assets/images/backgroundUserHeader.png'
import userImg from '../../assets/images/people2.png'
import smileGood from '../../assets/images/smileGood.png'
import smileOk from '../../assets/images/smileOk.png'
import smileAverage from '../../assets/images/smileAverage.png'
import smileBad from '../../assets/images/smileBad.png'
import smileVeryBad from '../../assets/images/smileVeryBad.png'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


export type ItemData = {
    id: string;
    title: string;
    img: ImageSourcePropType;
};

export const DATA: ItemData[] = [
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
   /* {
        id: '5',
        img: smileAverage,
        title: 'Average',
    },
    {
        id: '6',
        img: smileBad,
        title: 'I feel bad',
    },
    {
        id: '7',
        img: smileAverage,
        title: 'Average',
    },
    {
        id: '8',
        img: smileBad,
        title: 'I feel bad',
    }*/
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

const EmotionalStateS = ({navigation, route}) => {
    const [selectedId, setSelectedId] = useState<string>();
    const isFromChat = route.params?.fromChat

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
       <SafeAreaView style={{flex: 1, marginTop: Platform.OS === 'ios' ? 10 : 40,}}>
           {!isFromChat && <ArrowBack goBackPress={() => navigation.goBack()}/>}
           {
               isFromChat && <View>
                   <Image style={{width: 95, height: 170}} source={backgroundUserHeader}/>
                   <Image style={{width: 68, height: 68, position: 'absolute', top: 50, left: 40}} source={userImg}/>
               </View>
           }
           <View style={styles.container}>
               <View style={{marginTop: isFromChat ? 0 : 50}}>
                   <Text style={styles.text}>Evaluate your condition using this scale</Text>
               </View>
               <View style={{flex: 1, marginBottom: 10, marginTop: 50}}>
                   <FlatList
                       data={DATA}
                       renderItem={renderItem}
                       keyExtractor={item => item.id}
                       extraData={selectedId}
                   //    style={{flex:1, height: '100%', width: '100%'}}
                       contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', height: 'auto'}}
                   />
               </View>
               <ButtonGradient
                   styleTouchable={{marginBottom: 20}}
                   styleGradient={styles.button}
                   styleText={styles.textBtn}
                   btnText={isFromChat ? 'It’s ok' : 'Continue'}
                   onPress={() => {
                       navigation.navigate(isFromChat ? routerConstants.GOODBYE : routerConstants.SEARCHING_VOLUNTEER)
                   }}
               />
           </View>
       </SafeAreaView>
        /*<>

            <Backdrop/>
        </>*/
    );
};
const styles = StyleSheet.create({
    bodyContainer:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
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
        paddingHorizontal: 20,
        flex:1,
        justifyContent: 'space-between'
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