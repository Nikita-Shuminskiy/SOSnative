import {LinearGradient} from "expo-linear-gradient";
import {checkLanguage} from "../../../utils/utils";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import ArrowBack from "../../../components/ArrowBack";
import arrowLeftImg from "../../../assets/images/arrow_left_white.png";
import avatarMock from "../../../assets/images/user.png";
import ovalImg from "../../../assets/images/oval.png";
import React, {memo} from "react";
import {colors} from "../../../assets/colors/colors";
import {StatusBar} from "expo-status-bar";
import {AudienceType} from "../../../store/SocketStore/type";

type HeaderChatProps = {
    exitChatHandler: () => void
    getInfo: AudienceType
}
const HeaderChat = memo(({exitChatHandler, getInfo}: HeaderChatProps) => {
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            locations={[0.14, 0.8]}
            start={{x: 0.3, y: 0.2}}
            style={styles.headerContainer}>
            <StatusBar translucent={true} backgroundColor={'transparent'}/>
            {checkLanguage && <View style={{flexDirection: 'row-reverse'}}>
                <ArrowBack styleTouchable={styles.right} img={arrowLeftImg}
                           goBackPress={exitChatHandler}/>
                <Text style={[styles.textHeader, {position: 'absolute', left: 0, bottom: 15}]}>
                    Chat with
                </Text>
                <View style={styles.blockImgInfo}>
                    <Image style={[styles.userImg, {marginLeft: 20}]}
                           source={getInfo?.avatar ? {uri: getInfo?.avatar} : avatarMock}/>
                    <Text
                        style={[styles.userNameText, {marginLeft: 5}]}>{getInfo?.name ?? 'Waiting'}</Text>
                </View>
                <Image style={styles.userImgBackground} source={ovalImg}/>
            </View>}
            {!checkLanguage && <View style={[styles.header, {alignItems: 'flex-end'}]}>
                <View style={{marginBottom: 10}}>
                    <ArrowBack styleTouchable={styles.right} img={arrowLeftImg}
                               goBackPress={exitChatHandler}/>
                    <Text style={styles.textHeader}>
                        Chat with
                    </Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={{
                            ...styles.userNameText,
                            position: 'relative',
                            right: 20
                        }}>{getInfo?.name ?? 'Waiting'}</Text>
                    <ImageBackground style={{width: 82, height: 82}} source={ovalImg}>
                        <Image
                            style={{position: 'relative', right: 10, width: 68, height: 68, borderRadius: 50}}
                            source={getInfo?.avatar ? {uri: getInfo?.avatar} : avatarMock}/>
                    </ImageBackground>
                </View>
            </View>}
        </LinearGradient>
    );
})
const styles = StyleSheet.create({
    header: {width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    blockImgInfo: {width: '100%', flex: 1, flexDirection: 'row', marginRight: 25, marginTop: 15, alignItems: 'center'},
    userNameText: {
        textAlign: checkLanguage ? "left" : 'right',
        color: colors.white,
        fontSize: 15,
        maxWidth: 150,
        width: '100%'
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
        marginBottom: 15,
        borderRadius: 50
    },
    textHeader: {
        marginLeft: 25,
        fontSize: 18,
        fontWeight: '700',
        color: colors.white
    },
    headerContainer: {
        paddingTop: 20,
        width: '100%',
        minHeight: 110,
    },
    right: {},
})
export default HeaderChat
