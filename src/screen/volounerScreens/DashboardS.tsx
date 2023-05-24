import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import userImages from "../../assets/images/user.png";
import indicatorUsers from "../../assets/images/indicatorUsers.png";
import manWhite from "../../assets/images/manWhite.png";
import smileOk from "../../assets/images/smileOk.png";
import circle from "../../assets/images/circle.png";
import {colors} from "../../assets/colors/colors";

import {LinearGradient} from "expo-linear-gradient";
import * as Localization from "expo-localization";
import smileGood from "../../assets/images/smileGood.png";
import {VirtualizedList} from "../../components/virtualized-list";

type ItemProps = {
    item: any;
    checkLanguage: boolean;
};
const DATA = [
    {
        id: '1',
        img: smileGood,
        title: 'Michael wrote',
        time: '10 minutes ago',
        description: 'I feel bad about my parents’ divorce.',
    },
];
const Item = ({item, checkLanguage}: ItemProps) => (
    <TouchableOpacity style={[{
        padding: 20,
        backgroundColor: '#D5E3FE',
        borderRadius: 15,
        width: '100%',
        flex: 1,
        flexDirection: checkLanguage ? 'row-reverse'  :'row',
        justifyContent: 'space-between'
    }]}>
        <View style={{ flexDirection:  checkLanguage ? 'row-reverse'  :'row', justifyContent: 'space-between'}}>
            <View  style={{flexDirection: 'column',  marginTop: 20}}>
              <View style={{flexDirection:  checkLanguage ? 'row-reverse'  :'row'}}>
                  <Text style={{color: colors.blue, fontFamily: 'Onest-medium'}}>{item.title}</Text>
                  <Text style={{color: '#1F8298', fontFamily: 'Onest-medium', marginRight: checkLanguage ? 10 : 0, marginLeft: checkLanguage ? 0 : 10}}>{item.time}</Text>
              </View>
                <Text style={{
                    textAlign: 'right',
                    marginTop: 10,
                    color: '#1F8298',
                    fontFamily: 'Onest-medium',
                    fontWeight: '500',
                    fontSize: 18,
                    maxWidth: '91%'
                }}>{item.description}</Text>
            </View>


        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ position: 'absolute', right:checkLanguage ? -70 : 10, top: 0, flexDirection: checkLanguage ? 'row-reverse'  :'row', alignItems: 'center' }}>
                <Image  source={manWhite}/>
                <Text style={{paddingLeft: 10, color: '#1F8298', fontFamily: 'Onest-medium',}}>Heart</Text>
            </View>
        </View>
        <ImageBackground
            source={circle}
            style={{width: 68, height: 68, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: -10, right: -5}}
        >
            <Image style={{width: 38, height: 38}} source={smileOk}/>
        </ImageBackground>
    </TouchableOpacity>
);
const DashboardS = () => {
    const checkLanguage = Localization.locale.includes('he')
    const renderItem = ({item}: { item: any }) => {
        return (
            <Item
                checkLanguage={checkLanguage}
                item={item}
            />
        );
    };
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={{paddingHorizontal: 20}}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <View style={styles.blockUserText}>
                        <Text style={styles.textNameUser}>Jenny</Text>
                    </View>
                    <Image style={styles.img} source={userImages}/>
                </View>
                <View style={styles.blockHeader}>
                    <Image source={indicatorUsers}/>
                    <Text style={styles.textNameUser}>Go on!{'\n'}
                        You’ve helped 15 people this week.</Text>
                </View>
                <View style={styles.blockBody}>
                    <View>
                        <Text style={[styles.textNameUser, {color: '#1F8298', fontWeight: '500'}]}>Need your help!</Text>
                    </View>
                    <View style={{flex: 1, marginBottom: 10, marginTop: 20, width: '100%'}}>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                style={{flex:1, height: '100%', width: '100%'}}
                            />
                    </View>
                    <View style={{flex: 1, width: '100%'}}>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={[{
                                    width: '100%', height: 67, alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 8,
                                }]}>
                                <Text style={styles.text}>Take</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'Onest-medium',
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    blockBody: {
        flex: 1,
        alignItems: 'center'
    },
    blockUserText: {
        marginRight: 15
    },
    blockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1,
        marginTop: 8,
        marginBottom: 50
    },
    textNameUser: {
        color: colors.blue,
        fontSize: 16,
        //font-family: 'Inter';
    },
    textChange: {
        color: '#1F8298',
        fontSize: 16
        //font-family: 'Inter';
    },
    img: {
        width: 34,
        height: 34
    }
})

export default DashboardS;