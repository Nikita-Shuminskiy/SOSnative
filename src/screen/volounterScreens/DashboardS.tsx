import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import userImages from "../../assets/images/user.png";
import indicatorUsers from "../../assets/images/indicatorUsers.png";
import {colors} from "../../assets/colors/colors";

import {LinearGradient} from "expo-linear-gradient";
import * as Localization from "expo-localization";
import {routerConstants} from "../../constants/routerConstants";
import rootStore from "../../store/RootStore/root-store";
import AuthStore from "../../store/AuthStore/auth-store";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {RoomType} from "../../api/api";
import {Patient} from "../../components/list-viewer/Patient";
import EmptyList from "../../components/empty-list";
import CircularProgressBar from "../../components/CircularProgressBar";


type DashboardSType = {
    navigation: NavigationProp<ParamListBase>
}

const DashboardS = observer(({navigation}: DashboardSType) => {
    const checkLanguage = Localization.locale.includes('he')
    const {rooms, donePatients} = AuthStore
    const [selectedPatientRoomId, setSelectedPatientRoomId] = useState('')

    const {AuthStoreService} = rootStore

    const renderItem = ({item}: { item: RoomType }) => {
        const onPressPatientHandler = () => {
            setSelectedPatientRoomId(item.id)
        }

        return (
            <Patient
                onPress={onPressPatientHandler}
                checkLanguage={checkLanguage}
                selectedPatient={selectedPatientRoomId}
                patient={item}
            />
        );
    };

    const onPressTakePatient = () => {
        AuthStoreService.joinRoom(selectedPatientRoomId).then((data) => {
            if (data) {
                navigation.navigate(routerConstants.CHAT)
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await AuthStoreService.findRooms();
        };
        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        AuthStoreService.getDonePatients()
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const renderEmptyContainer = (height, text) => {
        const onPressLink = () => {

        }
        return (
            <EmptyList
                text={text}
                onPressLink={onPressLink}
            />
        )
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <View style={{paddingHorizontal: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate(routerConstants.VOLUNTEER_PROFILE)} style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <View style={styles.blockUserText}>
                        <Text style={styles.textNameUser}>Jenny</Text>
                    </View>
                    <Image style={styles.img} source={userImages}/>
                </TouchableOpacity>
                <View style={styles.blockHeader}>
                    <CircularProgressBar donePatients={donePatients}/>
                    <Text style={styles.textNameUser}>Go on!{'\n'}
                        You’ve helped {donePatients} people this week.</Text>
                </View>
                <View style={styles.blockBody}>
                    <View>
                        <Text style={[styles.textNameUser, {color: '#1F8298', fontWeight: '500'}]}>Need your
                            help!</Text>
                    </View>
                    <View style={{flex: 1, marginBottom: 10, marginTop: 20, width: '100%'}}>
                        <FlatList
                            data={rooms ?? []}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            contentContainerStyle={
                                !rooms?.length && styles.contentContainerStyle
                            }
                            ListEmptyComponent={() => renderEmptyContainer(0, '')}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            style={{flex: 1, height: '100%', width: '100%'}}
                        />
                    </View>
                    <View style={{flex: 1, width: '100%'}}>
                        <TouchableOpacity onPress={onPressTakePatient}>
                            <LinearGradient
                                colors={['#89BDE7', '#7EA7D9']}
                                style={[{
                                    width: '100%', height: 67, alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 8,
                                }]}>
                                <Text style={styles.text}>Take</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Onest-medium',
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
        justifyContent: 'space-evenly',
        flexGrow: 1,
        marginTop: 8,
        marginBottom: 50
    },
    textNameUser: {
        color: colors.blue,
        fontSize: 16,
        //font-family: 'Inter';
    },
    textChange: {
        color: '#1F8298',
        fontSize: 16
        //font-family: 'Inter';
    },
    img: {
        width: 34,
        height: 34
    }
})

export default DashboardS;
