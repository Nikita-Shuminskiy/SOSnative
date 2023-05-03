import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {BaseWrapperComponent,} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import userImages from '../../assets/images/user.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import Picker from "../../components/Picker";

const UserProfileS = ({navigation}) => {
    return (
        <BaseWrapperComponent>
            <ArrowBack goBackPress={() => navigation.goBack()}/>
            <View style={styles.blockUserInfo}>
                <Image style={styles.img} source={userImages}/>
                <View style={styles.blockUserText}>
                    <Text style={styles.textNameUser}>Michael</Text>
                    <TouchableOpacity>
                        <Text style={styles.textChange}>change</Text>
                    </TouchableOpacity>
                </View>
            </View>
           <View style={{flex:1, width: '100%'}}>
               <Picker/>
           </View>
            <Backdrop/>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    blockUserText: {
        marginLeft: 15
    },
    blockUserInfo: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 8,
        marginLeft: 40
    },
    textNameUser: {
        color: colors.blue,
        fontSize: 27,
        //font-family: 'Inter';
    },
    textChange: {
        color: '#1F8298',
        fontSize: 17
        //font-family: 'Inter';
    },
    img: {
        width: 68,
        height: 68
    }
})

export default UserProfileS;