import React, {useCallback, useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../assets/colors/colors";

import {LinearGradient} from "expo-linear-gradient";
import {routerConstants} from "../../constants/routerConstants";
import rootStore from "../../store/RootStore/root-store";
import AuthStore from "../../store/AuthStore/auth-store";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase, useIsFocused} from "@react-navigation/native";
import {Patient} from "../../components/list-viewer/Patient";
import {renderEmptyContainer} from "../../components/empty-list";
import CircularProgressBar from "../../components/CircularProgressBar";
import Backdrop from "../../components/backdrop";
import {VirtualizedList} from "../../components/virtualized-list";
import SocketStore from "../../store/SocketStore/socket-store";
import {StatusBar} from "expo-status-bar";
import userImages from '../../assets/images/user.png'
import {createAlert} from "../../components/alert";
import {RoomType} from "../../api/type";
import {Box} from "native-base";
import {useGoBack} from "../../utils/hook/useGoBack";
import {usePermissions} from "../../utils/hook/usePermissions";
import * as Animatable from "react-native-animatable";

type DashboardSType = {
    navigation: NavigationProp<ParamListBase>
    route: any
}

const DashboardS = observer(({navigation, route}: DashboardSType) => {
    const {askNotificationPermissionHandler, notificationStatus} = usePermissions()
    const goBackPress = () => {
        return true
    }
    useGoBack(goBackPress)
    const {user, rooms, setRooms} = AuthStore
    const [selectedPatientRoomId, setSelectedPatientRoomId] = useState('')
    const [donePatients, setDonePatient] = useState(0)
    const {AuthStoreService} = rootStore
    const {socketInit, getToolboxVolunteer} = SocketStore
    const isFocused = useIsFocused()
    const [intervalId, setIntervalId] = useState<number | null>(null)

    useEffect(() => {
        if (isFocused) {
            getToolboxVolunteer()
            if (notificationStatus !== 'granted') {
                askNotificationPermissionHandler()
            }
            AuthStoreService.getDonePatients().then((data) => {
                if (data) {
                    setDonePatient(data?.total)
                }
            })
            AuthStoreService.findRooms()
            const intervalId = +setInterval(() => {
                AuthStoreService.findRooms()
            }, 10000)
            setIntervalId(intervalId)
        } else {
            clearInterval(intervalId)
            setRooms([])
        }
    }, [isFocused]);
    const onPressPatientHandler = useCallback((id) => {
        setSelectedPatientRoomId(id)
    }, [])
    const renderRoom = useCallback(({item}: { item: RoomType }) => {
        return (
            <Patient
                onPress={onPressPatientHandler}
                selectedPatient={selectedPatientRoomId}
                patient={item}
            />
        );
    }, [selectedPatientRoomId])
    const onPressTakePatient = () => {
        if (!selectedPatientRoomId) return
        AuthStoreService.joinRoom(selectedPatientRoomId).then((data) => {
            const onPressExit = () => {
                AuthStoreService.findRooms()
            }
            if (!data.isActive) return createAlert({
                title: 'Message',
                message: `There's no patient in the room`,
                buttons: [{text: 'Exit', style: "default", onPress: onPressExit}]
            })
            if (!!data) {
                setSelectedPatientRoomId('')
                socketInit().then((socket) => {
                    if (!!socket) {
                        navigation.navigate(routerConstants.CHAT)
                    }
                })
            }
        })
    }
    return (
        <>
            <VirtualizedList>
                <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                    <Animatable.View animation={'zoomInUp'} style={{paddingHorizontal: 10}}>
                        <StatusBar hidden={false} style={'auto'} animated={true}
                                   translucent={false}/>
                        <TouchableOpacity onPress={() => navigation.navigate(routerConstants.VOLUNTEER_PROFILE)}
                                          style={{
                                              flex: 1,
                                              justifyContent: 'flex-end',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginTop: 10
                                          }}>
                            <View style={styles.blockUserText}>
                                <Text style={styles.textNameUser}>{user?.name}</Text>
                            </View>
                            <Image style={styles.img} source={user?.avatar ? {uri: user.avatar} : userImages}/>

                        </TouchableOpacity>
                        <View style={styles.blockHeader}>
                            <CircularProgressBar donePatients={donePatients}/>
                            <Text style={styles.textNameUser}>Go on!{'\n'}
                                You’ve helped {donePatients} people this week.</Text>
                        </View>
                        <View style={styles.blockBody}>
                            {
                                !!rooms?.length && <View>
                                    <Text style={[styles.textNameUser, {color: '#1F8298', fontWeight: '500'}]}>Need your
                                        help!</Text>
                                </View>
                            }

                            <View style={{flex: 1, marginBottom: 10, marginTop: 20, width: '100%'}}>
                                <FlatList
                                    data={rooms ?? []}
                                    renderItem={renderRoom}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={styles.contentContainerStyle}
                                    ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height - 200, 'There are no tasks for you right now.')}
                                    horizontal={false}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={{flex: 1, height: '100%', width: '100%'}}
                                />
                            </View>
                        </View>
                    </Animatable.View>
                </BaseWrapperComponent>
            </VirtualizedList>
            <Box alignItems={'center'} w={'100%'} px={2} mb={Platform.OS === 'ios' ? 8 : 5}>
                <TouchableOpacity style={{alignItems: 'center', width: '100%'}} onPress={onPressTakePatient}>
                    <LinearGradient
                        colors={['#89BDE7', '#7EA7D9']}
                        style={[{
                            width: '100%', height: 67,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                        }]}>
                        <Text style={styles.text}>Take</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Box>
            <Backdrop/>
        </>
    );
})


const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
    },
    blockBody: {
        flex: 1,
        alignItems: 'center'
    },
    blockUserText: {
        marginRight: 15
    },
    blockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        width: '100%',
        marginTop: 8,
        marginBottom: 40
    },
    textNameUser: {
        color: colors.blue,
        fontSize: 14,
        fontWeight: 'normal',
        //font-family: 'Inter';
    },
    img: {
        width: 34,
        height: 34,
        borderRadius: 30
    }
})

export default DashboardS;
