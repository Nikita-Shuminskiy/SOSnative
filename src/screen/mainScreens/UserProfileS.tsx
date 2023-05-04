import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Switch} from "react-native";
import {BaseWrapperComponent,} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import userImages from '../../assets/images/user.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import Picker from "../../components/Picker";
import logoutImages from '../../assets/images/logout.png'

const UserProfileS = ({navigation}) => {
    const [notifications, setNotifications] = useState(false)
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
            <View style={{flex: 1, marginRight: 20, marginLeft: 20, alignItems: 'center'}}>

                <View style={styles.blockPicker}>
                    <Picker selectStyles={{
                        margin: -15,
                        height: 67
                    }}/>
                </View>
                <View style={styles.notificationsBlock}>
                    <Text style={styles.textNotification}>Notifications</Text>
                    <Switch
                        thumbColor={colors.blue}
                        trackColor={{false: colors.white, true: colors.white}}
                        style={{marginLeft: 165 /*width: 41, height: 26, borderWidth: 2*/}}
                        onValueChange={() => setNotifications(prevState => !prevState)}
                        value={notifications}
                    />
                </View>
                <TouchableOpacity style={{...styles.notificationsBlock, position: 'absolute', bottom: 80}}>
                    <Text style={styles.textNotification}>Logout</Text>
                    <Image source={logoutImages}/>
                </TouchableOpacity>
            </View>
            <Backdrop/>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    blockPicker: {
        backgroundColor: '#D5E3FE',
        height: 67,
        width: 341,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
    },
    textNotification: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: '400',
    },
    notificationsBlock: {
        paddingHorizontal: 20,
        height: 67,
        width: 341,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#D5E3FE',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    blockUserText: {
        marginLeft: 15
    },
    blockUserInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 8,
        marginLeft: 50,
        marginBottom: 50
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