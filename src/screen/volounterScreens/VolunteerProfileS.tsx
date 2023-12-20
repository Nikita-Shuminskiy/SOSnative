import React, {useEffect, useState} from 'react';
import * as Localization from "expo-localization";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import {Image, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import userImages from "../../assets/images/people2.png";
import Picker from "../../components/Picker";
import {colors} from "../../assets/colors/colors";
import logoutImages from "../../assets/images/logout.png";
import Backdrop from "../../components/backdrop";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box} from "native-base";
import BtnLogOut from "../../components/btnLogOut";
import * as Notifications from 'expo-notifications';
import {checkLanguage} from "../../utils/utils";
type VolunteerProfileSProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const VolunteerProfileS = observer(({navigation, route}: VolunteerProfileSProps) => {
    const {user} = AuthStore
    const {AuthStoreService} = rootStore
    const [areNotificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        // Проверяем, включены ли уведомления при монтировании компонента
        checkNotificationStatus();
    }, []);

    const checkNotificationStatus = async () => {
        const settings = await Notifications.getPermissionsAsync();
        setNotificationsEnabled(settings.granted);
    };

    const onPressLogOut = () => {
        AuthStoreService.logOut()
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
                        <View style={styles.blockPicker}>
                            <Picker onValueChange={(e) => {
                            }} selectStyles={{
                                margin: -15,
                                height: 67
                            }}/>
                        </View>
                        <View style={[styles.notificationsBlock, {flexDirection: checkLanguage ? 'row-reverse' : 'row'}]}>
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
                            fontSize: 18,
                            textAlign: 'center'
                        }}>Situations in which a person feels bad can happen at any moment. Turn on notifications to see
                            when they appear.</Text>
                    </Box>

                    <Box mt={2}>
                        <BtnLogOut onPressLogOut={onPressLogOut} />
                    </Box>
                </Box>

            </BaseWrapperComponent>
            <Backdrop/>
        </>
    );
});
const styles = StyleSheet.create({
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

export default VolunteerProfileS;
