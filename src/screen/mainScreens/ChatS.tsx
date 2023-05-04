import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Image} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import ovalImg from "../../assets/images/oval.png";
import userImg from "../../assets/images/Ellipse48.png";
import {LinearGradient} from "expo-linear-gradient";
import {colors} from "../../assets/colors/colors";
//D5E3FE
const ChatS = ({navigation}) => {
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
                <LinearGradient
                    colors={['rgba(223,233,255,0.64)', '#D5E3FE']}
                    locations={[0.14, 0.8]}
                    start={{x: 0.1, y: 0.2}}
                    //end={{x: 0, y: 1}}
                    style={{width: '100%', flex: 7}}>

                </LinearGradient>
            </LinearGradient>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
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
        height: 126,
        flex: 1
    },
    arrowBack: {},
})

export default ChatS;