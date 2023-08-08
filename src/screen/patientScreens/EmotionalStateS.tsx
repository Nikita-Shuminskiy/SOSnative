import React, {useState} from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ButtonGradient from "../../components/ButtonGradient";
import {routerConstants} from "../../constants/routerConstants";
import {colors} from "../../assets/colors/colors";
import ArrowBack from "../../components/ArrowBack";
import backgroundUserHeader from '../../assets/images/backgroundUserHeader.png'
import backgroundUserHeaderHe from '../../assets/images/backgroundUserHeader-He.png'
import userImg from '../../assets/images/people2.png'
import arrowBack from "../../assets/images/keyboard_arrow_left-He.png";
import * as Localization from "expo-localization";
import AuthStore from "../../store/AuthStore/auth-store";
import rootStore from "../../store/RootStore/root-store";
import SocketStore from "../../store/SocketStore/socket-store";
import {ConditionRateData} from "../../utils/generalData";
import Backdrop from "../../components/backdrop";
import currentCondition from "../../components/CurrentCondition";


export type ItemData = {
    id: number;
    title: string;
    description?: string
    img: ImageSourcePropType;
};


type ItemProps = {
    item: ItemData;
    onPress: () => void;
    borderColor: string;
    checkLanguage: boolean;
};

const EmotionalStateViewer = ({item, onPress, borderColor, checkLanguage}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {
        borderColor: borderColor,
        borderWidth: borderColor ? 1 : 0,
        borderRadius: borderColor ? 9 : 0,
        width: 264, height: 78,
        flexDirection: checkLanguage ? 'row-reverse' : 'row'

    }]}>
        <Image style={styles.img} source={item.img}/>
        <Text style={[styles.textImg]}>{item.title}</Text>
    </TouchableOpacity>
);

const EmotionalStateS = ({navigation, route}: any) => {
    const checkLanguage = Localization.locale.includes('he')
    const [selectedState, setSelectedState] = useState<number>(1);
    const {setDataPatient, dataPatient, user} = AuthStore
    const {AuthStoreService} = rootStore
    const isFromChat = route.params?.fromChat
    const {
        setDataScoresAfterChat,
        setVolunteerEvaluation,
        disconnectSocket
    } = SocketStore

    const emotionalStateView = ({item}: { item: ItemData }) => {
        const borderColor = item.id === selectedState ? colors.gray : '';
        if (isFromChat) {
            setDataScoresAfterChat(selectedState, 'resultConditionRate')
        } else {
            setDataPatient(selectedState, 'conditionRate')
        }

        return (
            <EmotionalStateViewer
                checkLanguage={checkLanguage}
                item={item}
                onPress={() => setSelectedState(item.id)}
                borderColor={borderColor}
            />
        );
    };
    const onPressBtnHandler = () => {
        if (!selectedState) return
        if (isFromChat) {
            setVolunteerEvaluation(user?.id)
            disconnectSocket(user?.id)
            navigation.navigate(routerConstants.GOODBYE)
            return
        } else {
            AuthStoreService.createRoom({...dataPatient, conditionRate: selectedState }).then((data) => {
                if (data) {
                    navigation.navigate(routerConstants.CHAT)
                }
            })
        }
    }
    return (
        <SafeAreaView style={{flex: 1, marginTop: Platform.OS === 'ios' ? 10 : 40}}>
            {!isFromChat && <ArrowBack img={checkLanguage ? arrowBack : null} goBackPress={() => navigation.goBack()}/>}
            {
                isFromChat && <View>
                    <Image style={{width: 95, height: 170}}
                           source={checkLanguage ? backgroundUserHeaderHe : backgroundUserHeader}/>
                    <Image style={{width: 68, height: 68, position: 'absolute', top: 50, left: 40}} source={userImg}/>
                </View>
            }
            <View style={styles.container}>
                <View style={{marginTop: isFromChat ? 0 : 50}}>
                    <Text style={styles.text}>Evaluate your condition using this scale</Text>
                </View>
                <View style={{flex: 1, marginBottom: 10, marginTop: 50}}>
                    <FlatList
                        data={ConditionRateData}
                        renderItem={emotionalStateView}
                        keyExtractor={item => String(item.id)}
                        extraData={selectedState}
                        //    style={{flex:1, height: '100%', width: '100%'}}
                        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', height: 'auto'}}
                    />
                </View>
                <ButtonGradient
                    styleTouchable={{marginBottom: 20}}
                    styleGradient={styles.button}
                    styleText={styles.textBtn}
                    btnText={isFromChat ? 'It’s ok' : 'Continue'}
                    onPress={onPressBtnHandler}
                />
            </View>
            <Backdrop/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        alignItems: 'center',
        paddingHorizontal: 30,
        //justifyContent: 'center'
    },

    blockImg: {
        flexDirection: "row",
        alignItems: 'center',
    },
    img: {
        width: 68,
        height: 68,
        marginRight: 20
    },
    textImg: {
        marginRight: 20,
        fontFamily: 'Onest-light',
        color: colors.blue,
        fontSize: 16
    },
    text: {
        fontSize: 24,
        fontFamily: 'Onest-medium',
        color: colors.blue,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 67,
        borderRadius: 8,
    },
    textBtn: {
        fontSize: 18,
        color: colors.white,
    },
})
export default EmotionalStateS;
