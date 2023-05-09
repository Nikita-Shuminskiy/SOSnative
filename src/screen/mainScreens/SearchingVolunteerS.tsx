import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Platform} from "react-native";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import ArrowBack from "../../components/ArrowBack";
import {colors} from "../../assets/colors/colors";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import PeoplesWitchElements from "../../assets/images/people-witch-elements.png";
import imgPeople from "../../assets/images/people2.png";
import imgPeople2 from "../../assets/images/Ellipse47.png";
import imgPeople3 from "../../assets/images/Ellipse48.png";
import {routerConstants} from "../../constants/routerConstants";


const SearchingVolunteerS = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate(routerConstants.CHAT)
        }, 2000)
    }, [])
    return (
        <BaseWrapperComponent isBackdrop={true} isKeyboardAwareScrollView={true} styleSafeArea={{marginTop: 0}}>
            <View style={{marginTop: Platform.OS === 'ios' ? 10 : 40, marginHorizontal: 30}}>
                <View style={{marginBottom: 70}}>
                    <ArrowBack styleTouchable={styles.arrowBack} img={arrowLeftImg}
                               goBackPress={() => navigation.goBack()}/>
                </View>

                <View>
                    <View>
                        <Text style={styles.textHeader}>Searching for a volunteer for you!</Text>
                        <Text style={styles.text}>It will take no longer than 5 minutes. </Text>
                    </View>

                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>

                        <View style={styles.footerBlock}>
                            <Image style={styles.imgFooter} source={imgPeople3}/>
                            {/*<View style={{position: 'absolute', bottom: 0, left: 100}}>

                               </View>*/}
                            <Image style={{width: 131, height: 131}} source={imgPeople}/>
                            <Image style={styles.imgFooter} source={imgPeople2}/>
                        </View>
                    </View>
                </View>
            </View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    footerBlock: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 60,
        marginBottom: 20
    },
    imgFooter: {
        width: 77,
        height: 77
    },
    imgPeople: {
        width: 334,
        height: 326
    },
    arrowBack: {
        marginTop: 0,
        marginLeft: 0,
        position: 'absolute',
        top: 10,
        left: -25
    },
    textHeader: {
        fontSize: 28,
        fontFamily: 'Onest-bold',
        color: colors.white,
        marginBottom: 15
    },
    text: {

        fontSize: 18,
        fontFamily: 'Onest-light',
        opacity: 0.5,
        color: colors.white,
    },
})

export default SearchingVolunteerS;