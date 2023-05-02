import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import userImages from '../../assets/images/user.png'
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import {LinearGradient} from "expo-linear-gradient";

const NeedHelpS = () => {
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.nameUser}>Michael</Text>
                        <Image source={userImages} style={styles.logo}/>
                    </View>
                    <View style={styles.description}>
                        <View style={{   alignItems: 'flex-start',
                            flex: 1}}>
                            <Text style={styles.textHi}>Hi, Michael!</Text>
                            <Text style={styles.text}>Don’t worry, we’re here to help you cope with any situation.
                                Describe the problem and press the button below.</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TextInput style={styles.input} placeholder={'I feel depressed...'}/>
                            <TouchableOpacity onPress={() => {
                            }}>
                                <LinearGradient
                                    colors={['#89BDE7', '#7EA7D9']}
                                    style={styles.button}>
                                    <Text style={styles.textBtn}>I need help!</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BaseWrapperComponent>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(255,255,255,0.04)','rgb(213,227,254)', '#d5e3fe']}
                //start={{ x: 1, y: 0.1 }}
                locations={[0.14, 0.8, 2]}
                start={{x: 0.2, y: 0.1}}
                //end={{x: 0, y: 1}}
                style={styles.background}
            />
        </>
    );
};
const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginRight: 20,
       marginLeft: 20,

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 350,
        zIndex: -1
    },
    button: {
        width: 265,
        height: 160,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
       /* shadowColor: "rgba(0,0,0,0.56)",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 100,

        elevation: 10,*/
    },
    input: {
        marginBottom: 40
    },
    textBtn: {
        color: colors.white,
        fontFamily: 'Onest-medium',
        fontSize: 24

    },
    description: {
        marginTop: 80
    },
    textHi: {
        fontSize: 24,
        fontFamily: 'Onest-medium',
        marginBottom: 30,
        color: colors.blue
    },
    text: {
        fontFamily: 'Onest-medium',
        color: colors.blue
    },
    logo: {
        width: 34,
        height: 34
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    nameUser: {
        fontSize: 16,
        fontWeight: '400',
        color: colors.blueLightMedium,
        marginRight: 12
        //fontFamily: 'Inter'
    }
});

export default NeedHelpS;