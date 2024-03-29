import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import PeoplesWitchElements from "../../assets/images/manWitchBrain.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";
import {observer} from "mobx-react-lite";
import SocketStore from "../../store/SocketStore/socket-store";
import * as Animatable from 'react-native-animatable'

type GoodbyePageSProps = {
    navigation: any
    route: any
}

const GoodbyePageS = observer(({navigation, route}: GoodbyePageSProps) => {
    const {forcedClosingSocket, socket, user} = SocketStore
    const onPressGoStart = () => {
        socket?.disconnect() // ??
        forcedClosingSocket(user.id)
        navigation.navigate(routerConstants.NEED_HELP)
    }
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View style={{justifyContent: 'space-evenly', width: '100%', flex: 1}}>
                <View style={styles.blockBody}>
                    <View style={styles.blockImg}>
                        <View style={{marginBottom: 30}}>
                            <Text style={styles.textHeader}>Thank you!</Text>
                            <Text style={styles.text}>We've been through this together. Come back when you feel bad
                                again.</Text>
                        </View>
                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>
                    </View>
                </View>

                <Animatable.View animation={'bounce'} easing={"ease-in"} iterationCount={1}>
                    <Button styleText={styles.textBtn} styleContainer={styles.btnContainer} textBtn={'Ok, thanks'}
                            onPress={onPressGoStart}/>
                </Animatable.View>
            </View>
        </LinearGradient>
    );
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    blockImg: {width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 10},
    blockBody: {
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        borderWidth: 1,
        borderColor: colors.white, marginHorizontal: 20, marginVertical: 20
    },
    textBtn: {
        color: colors.white, fontWeight: '500', fontSize: 18
    },
    imgPeople: {
        width: 234,
        height: 226
    },
    textHeader: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 15
    },
    text: {
        fontSize: 18,
        fontWeight: 'normal',
        opacity: 0.5,
        color: colors.white,
    },
})

export default GoodbyePageS;
