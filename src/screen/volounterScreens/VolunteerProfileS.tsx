import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import {StyleSheet, Switch, View} from "react-native";
import Picker from "../../components/Picker";
import {colors} from "../../assets/colors/colors";
import Backdrop from "../../components/backdrop";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box, Text} from "native-base";
import BtnLogOut from "../../components/btnLogOut";
import * as Notifications from 'expo-notifications';
import {checkLanguage} from "../../utils/utils";
import AvatarProfile from "../../components/AvatarProfile";
import Constants from "expo-constants";
import Link from "../../components/Link";
import {createAlert} from "../../components/alert";
import * as Animatable from "react-native-animatable";

type VolunteerProfileSProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const VolunteerProfileS = observer(({navigation, route}: VolunteerProfileSProps) => {
    const {user} = AuthStore
    const {AuthStoreService} = rootStore
    const [areNotificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        checkNotificationStatus();
    }, []);

    const checkNotificationStatus = async () => {
        const settings = await Notifications.getPermissionsAsync();
        setNotificationsEnabled(settings.granted);
    };

    const onPressLogOut = () => {
        AuthStoreService.logOut()
    }
    const onPressDeleteAccount = (isDelete?: boolean) => {
        createAlert({
            title: 'Message',
            buttons: [{text: 'Delete', onPress: () => AuthStoreService.logOut(isDelete)}, {text: 'Close'}],
            message: 'Do you really want to delete the account?'
        })
    }
    const toggleNotifications = async () => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: areNotificationsEnabled,
                shouldPlaySound: areNotificationsEnabled,
                shouldSetBadge: areNotificationsEnabled,
            }),
        });
        setNotificationsEnabled(!areNotificationsEnabled);
    };
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>
                <Animatable.View animation={'zoomInUp'} style={{
                    paddingHorizontal: 12,
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                >
                    <Box alignItems={'center'}>
                        <Box mb={3} alignItems={'center'}>
                            <AvatarProfile photo={user?.avatar}/>
                            <Text mt={1} style={styles.textNameUser}>{user?.name}</Text>
                        </Box>
                        <View style={styles.blockPicker}>
                            <Picker onValueChange={(e) => {
                            }} selectStyles={{
                                margin: -15,
                                height: 67
                            }}/>
                        </View>
                        <View
                            style={[styles.notificationsBlock, {flexDirection: checkLanguage ? 'row-reverse' : 'row'}]}>
                            <Text style={styles.textNotification}>Notifications</Text>
                            <Switch
                                thumbColor={colors.blue}
                                trackColor={{false: colors.white, true: colors.white}}
                                style={{marginLeft: 0 /*width: 41, height: 26, borderWidth: 2*/}}
                                onValueChange={() => toggleNotifications()}
                                value={areNotificationsEnabled}
                            />
                        </View>
                        <Text style={{
                            marginTop: 20,
                            color: '#51658D',
                            fontWeight: '500',
                            fontSize: 15,
                            textAlign: 'center'
                        }}>Situations in which a person feels bad can happen at any moment. Turn on notifications to see
                            when they appear.</Text>
                    </Box>

                    <Box mt={2} alignItems={'center'}>
                        <BtnLogOut onPressLogOut={onPressLogOut}/>
                        <Box mt={2}>
                            <Link styleText={styles.textDelete} onPress={() => onPressDeleteAccount(true)}
                                  text={'Delete and forgot account'}/>
                        </Box>
                        <Text mt={1} fontWeight={'normal'} fontSize={15}
                              color={colors.gray}>version {Constants?.expoConfig?.version}</Text>
                    </Box>
                </Animatable.View>
            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
});
const styles = StyleSheet.create({
    textDelete: {
        color: colors.red,
        fontSize: 16,
        fontWeight: '400',
    },
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
    textNameUser: {
        textAlign: 'center',
        color: colors.blue,
        fontSize: 21,
        fontWeight: 'normal',
    }
})

export default VolunteerProfileS;
