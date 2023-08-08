import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import userImages from "../../assets/images/people2.png"
import {colors} from "../../assets/colors/colors";

import {LinearGradient} from "expo-linear-gradient";
import {routerConstants} from "../../constants/routerConstants";
import rootStore from "../../store/RootStore/root-store";
import AuthStore from "../../store/AuthStore/auth-store";
import {observer} from "mobx-react-lite";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {RoomType} from "../../api/api";
import {Patient} from "../../components/list-viewer/Patient";
import EmptyList from "../../components/empty-list";
import CircularProgressBar from "../../components/CircularProgressBar";
import Backdrop from "../../components/backdrop";
import {VirtualizedList} from "../../components/virtualized-list";

const renderEmptyContainer = (height, text) => {
    const onPressLink = () => {

    }
    return (
        <EmptyList
            height={height}
            text={text}
            onPressLink={onPressLink}
        />
    )
}

type DashboardSType = {
    navigation: NavigationProp<ParamListBase>
    route: any
}

const DashboardS = observer(({navigation, route}: DashboardSType) => {
    const {user, rooms} = AuthStore

    const [selectedPatientRoomId, setSelectedPatientRoomId] = useState('')
    const [donePatients, setDonePatient] = useState(0)
    const {AuthStoreService} = rootStore

    let intervalId

    const fetchData = () => {
        if (navigation.getState().index >= 1) return
        AuthStoreService.findRooms()
    };
    useEffect(() => {
        AuthStoreService.getDonePatients().then((data) => {
            if (data) {
                setDonePatient(data?.total)
            }
        })

        fetchData()
        intervalId = +setInterval(fetchData, 3000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const renderRoom = ({item}: { item: RoomType }) => {
        const onPressPatientHandler = () => {
            setSelectedPatientRoomId(item.id)
        }
        return (
            <Patient
                onPress={onPressPatientHandler}
                selectedPatient={selectedPatientRoomId}
                patient={item}
            />
        );
    };
    const onPressTakePatient = () => {
        if (!selectedPatientRoomId) return
        AuthStoreService.joinRoom(selectedPatientRoomId).then((data) => {
            if (data) {
                navigation.navigate(routerConstants.CHAT)
            }
        })
    }


    return (
        <>
          <VirtualizedList>
              <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                  <View style={{paddingHorizontal: 10}}>
                      <TouchableOpacity onPress={() => navigation.navigate(routerConstants.VOLUNTEER_PROFILE)} style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10
                      }}>
                          <View style={styles.blockUserText}>
                              <Text style={styles.textNameUser}>{user?.name}</Text>
                          </View>
                          <Image style={styles.img} source={userImages}/>
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
                                  contentContainerStyle={
                                      !rooms?.length ? styles.contentContainerStyle : {
                                          alignItems: 'center',
                                          justifyContent: 'center'
                                      }
                                  }
                                  ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height - 200, 'There are no tasks for you right now.')}
                                  horizontal={false}
                                  showsVerticalScrollIndicator={false}
                                  showsHorizontalScrollIndicator={false}
                                  style={{flex: 1, height: '100%', width: '100%'}}
                              />
                          </View>
                      </View>
                  </View>
              </BaseWrapperComponent>
          </VirtualizedList>
            <View style={{alignItems: 'center', width: '100%'}}>
                <TouchableOpacity style={{alignItems: 'center', width: '100%'}} onPress={onPressTakePatient}>
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
            <Backdrop/>
        </>
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
