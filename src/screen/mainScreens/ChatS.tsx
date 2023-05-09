import React, {useEffect} from 'react';
import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import ovalImg from "../../assets/images/oval.png";
import userImg from "../../assets/images/Ellipse48.png";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../../assets/colors/colors";
import ChatAvatar from "../../components/ChatAvatar";
import ChatList from "../../components/list-viewer/ChatList";
import {VirtualizedList} from "../../components/virtualized-list";
import CurrentCondition from "../../components/CurrentCondition";
import InputFieldsChat from "../../components/InputFieldsChat";
import {routerConstants} from "../../constants/routerConstants";
//D5E3FE

const chatData = [
    {
        isDoctor: true,
        avatar: userImg,
        id: 1,
        text: 'I feel really bad because my parents are getting divorced. I haven\'t eaten anything for three days, I can only lie in my room and cry. I don\'t know how I can survive this...'
    },
    {isDoctor: false, avatar: userImg, id: 2, text: '.I don\'t know how I can survive this...'},
    {isDoctor: true, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: false, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: true, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: false, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: true, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: false, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},
    {isDoctor: true, avatar: userImg, id: 2, text: ' I don\'t know how I can survive this...'},


]
const ChatS = ({navigation}) => {
    const chatView = ({item}) => {
        return <ChatList key={item.id} data={item}/>
    }
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(routerConstants.EVALUATION_CONDITION, {fromChat: true})
        }, 30000)
    }, [])
    return (
        <SafeAreaView style={{flex: 1}}>
            <LinearGradient
                colors={['#89BDE7', '#7EA7D9']}
                locations={[0.14, 0.8]}
                start={{x: 0.3, y: 0.2}}
                style={styles.headerContainer}>

                <View style={styles.header}>
                    <View style={{width: '100%', flex: 1}}>
                        <ArrowBack styleTouchable={styles.arrowBack} img={arrowLeftImg}
                                   goBackPress={() => navigation.goBack()}/>
                        <Text style={styles.textHeader}>
                            Chat with
                        </Text>
                    </View>

                    <View>
                        <View style={styles.blockImgInfo}>
                            <Text style={styles.userNameText}>Jenny</Text>
                            <Image style={styles.userImg} source={userImg}/>
                        </View>
                        <Image style={styles.userImgBackground} source={ovalImg}/>
                    </View>
                </View>
            </LinearGradient>


            <View style={{flex : 1}}>
                <LinearGradient
                    colors={['rgba(213,227,254,0.71)', 'rgba(223,233,255,0.97)']}
                    locations={[0.14, 0.8]}
                    start={{x: 0.1, y: 0.2}}
                    //end={{x: 0, y: 1}}
                >
                    <VirtualizedList>
                        <ScrollView contentContainerStyle={{paddingHorizontal: 20, marginBottom: 190}}>
                            <ChatAvatar/>
                            <FlatList
                                data={chatData}
                                renderItem={chatView}
                                keyExtractor={(item, index) => index.toString()}
                                style={{width: '100%'}}
                                /*   ListEmptyComponent={renderEmptyContainer}*/
                                contentContainerStyle={
                                    {width: '100%', flex: 1}
                                }

                            />
                        </ScrollView>
                    </VirtualizedList>
                </LinearGradient>

                <View style={{position: 'absolute', bottom: 0}}>
                    <Text style={styles.text}>Your current condition</Text>
                    <CurrentCondition/>
                    <InputFieldsChat/>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    text: {
        color: '#9BB5E9',
        fontFamily: 'Onest-light',
        fontSize: 13,
        textAlign: 'center'
    },
    header: {width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    blockImgInfo: {width: '100%', flex: 1, flexDirection: 'row', marginRight: 25, marginTop: 15, alignItems: 'center'},
    userNameText: {
        color: colors.white,
        fontSize: 16
    },
    userImgBackground: {
        zIndex: -1,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    userImg: {
        width: 68,
        height: 68,
        marginLeft: 10,
        marginBottom: 15
    },
    textHeader: {
        marginLeft: 25,
        fontSize: 24,
        fontWeight: '700',
        color: colors.white
    },
    headerContainer: {
        paddingTop: 30,
        width: '100%',
        minHeight: 126
    },
    arrowBack: {},
})

export default ChatS;