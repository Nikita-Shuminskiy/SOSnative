import React, {useState} from 'react';
import {Image, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {BaseWrapperComponent,} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import userImages from '../../assets/images/user.png'
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import Picker from "../../components/Picker";
import logoutImages from '../../assets/images/logout.png'
import * as Localization from "expo-localization";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import {checkLanguage} from "../../utils/utils";
import {Box} from "native-base";
import BtnLogOut from "../../components/btnLogOut";

const UserProfileS = ({navigation}) => {
    const checkLanguage = Localization.locale.includes('he')
    const {user} = AuthStore
    const {AuthStoreService} = rootStore
    const [notifications, setNotifications] = useState(false)
    const onPressLogOut = () => {
        AuthStoreService.logOut()
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>
            <Box paddingX={4} flex={1} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                <Box alignItems={'center'}>
                    <View style={styles.blockHeader}>
                        <Image style={styles.img} source={userImages}/>
                        <View style={styles.blockUserText}>
                            <Text style={styles.textNameUser}>{user?.name}</Text>
                            <TouchableOpacity>
                                <Text style={styles.textChange}>change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.blockBody}>
                        <View style={styles.blockPicker}>
                            <Picker onValueChange={(e) => {}} selectStyles={styles.picker}/>
                        </View>
                        <View
                            style={[styles.notificationsBlock, {flexDirection: checkLanguage ? 'row-reverse' : 'row'}]}>
                            <Text style={styles.textNotification}>Notifications</Text>
                            <Switch
                                thumbColor={colors.blue}
                                trackColor={{false: colors.white, true: colors.white}}
                                style={{marginLeft: 0 /*width: 41, height: 26, borderWidth: 2*/}}
                                onValueChange={() => setNotifications(prevState => !prevState)}
                                value={notifications}
                            />
                        </View>
                    </View>
                </Box>
            </Box>
            <Box mt={2} alignItems={'center'}>
                <BtnLogOut onPressLogOut={onPressLogOut} />
            </Box>
            <Backdrop/>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    picker: {
        margin: -15,
        height: 67
    },
    blockBody: {flex: 1, marginRight: 20, marginLeft: 20, alignItems: 'center'},
    blockPicker: {
        backgroundColor: '#D5E3FE',
        height: 67,
        width: 341,
        paddingRight: 20,
        paddingLeft: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    textNotification: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: '400',
    },
    notificationsBlock: {
        paddingHorizontal: 10,
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
    blockHeader: {
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
        maxWidth: 200,
        width: '100%'
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
