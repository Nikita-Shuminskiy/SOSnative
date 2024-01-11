import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
import {BaseWrapperComponent,} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import Picker from "../../components/Picker";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import {checkLanguage} from "../../utils/utils";
import {Box} from "native-base";
import BtnLogOut from "../../components/btnLogOut";
import AvatarProfile from "../../components/AvatarProfile";
import {observer} from "mobx-react-lite";
import {NavigationProp} from "@react-navigation/native";
type UserProfileSProps = {
    navigation: NavigationProp<any>
}
const UserProfileS = observer(({navigation}:UserProfileSProps ) => {
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
                    <Box mb={3}>
                        <AvatarProfile photo={user?.avatar}/>
                        <Text style={styles.textNameUser}>{user?.name}</Text>
                    </Box>
                    <View style={styles.blockBody}>
                        <View style={styles.blockPicker}>
                            <Picker onValueChange={(e) => {
                            }} selectStyles={styles.picker}/>
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
                <BtnLogOut onPressLogOut={onPressLogOut}/>
            </Box>
            <Backdrop/>
        </BaseWrapperComponent>
    );
})
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
    textNameUser: {
        color: colors.blue,
        fontSize: 27,
        maxWidth: 200,
        width: '100%',
        fontWeight: 'normal'
    },
    img: {
        width: 68,
        height: 68
    }
})

export default UserProfileS;
