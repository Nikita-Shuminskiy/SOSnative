import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import PeoplesWitchElements from "../../assets/images/manWitchBrain.png";
import Button from "../../components/Button";
import {routerConstants} from "../../constants/routerConstants";
import {LinearGradient} from "expo-linear-gradient";
import {StatusBar} from "expo-status-bar";

const GoodbyePageS = ({navigation, route}) => {
    const onPressGoStart = () => {
        navigation.navigate(routerConstants.NEED_HELP)
    }
    return (
      <>
          <StatusBar hidden={false} style={'auto'} animated={true} backgroundColor={'rgba(213,227,254,0.71)'}
                     translucent={false}/>
          <SafeAreaView style={styles.containerSafeArea}>
              <LinearGradient
                  colors={['#89BDE7', '#7EA7D9']}
                  style={styles.container}>
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

                      <Button styleText={styles.textBtn} styleContainer={styles.btnContainer} title={'Ok, thanks'}
                              onPress={onPressGoStart}/>
                  </View>
              </LinearGradient>
          </SafeAreaView>
      </>
    );
};

const styles = StyleSheet.create({
    containerSafeArea: {flex: 1, width: '100%'},
    container: {
        flex: 1,
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
    right: {
        marginTop: 0,
        marginLeft: 0,
        position: 'absolute',
        top: 10,
        left: -25
    },
    textHeader: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 15
    },
    text: {

        fontSize: 18,
        opacity: 0.5,
        color: colors.white,
    },
})

export default GoodbyePageS;
