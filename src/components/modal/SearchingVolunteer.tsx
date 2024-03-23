import React, {memo, useEffect} from 'react';
import {Image, Platform, StyleSheet, Text} from "react-native";
import ArrowBack from "../ArrowBack";
import {colors} from "../../assets/colors/colors";
import arrowLeftImg from "../../assets/images/arrow_left_white.png";
import PeoplesWitchElements from "../../assets/images/people-witch-elements.png";
import imgPeople from "../../assets/images/people2.png";
import imgPeople2 from "../../assets/images/Ellipse47.png";
import imgPeople3 from "../../assets/images/Ellipse48.png";
import arrowBack from "../../assets/images/keyboard_arrow_left-white.png";
import {checkLanguage} from "../../utils/utils";
import {LinearGradient} from "expo-linear-gradient";
import {Box} from "native-base";
import {StatusBar} from "expo-status-bar";
import * as Animatable from 'react-native-animatable'
import Button from "../Button";
import {routerConstants} from "../../constants/routerConstants";

type SearchingVolunteerModalProps = {
    volunteerJoinedData: any
    navigation: any
    onLeave?: () => void
    onPressGoGameTest?: () => void
}
const SearchingVolunteer = memo(({
                                     navigation,
                                     volunteerJoinedData,
                                     onLeave,
                                     onPressGoGameTest
                                 }: SearchingVolunteerModalProps) => {
    const goBackPress = () => {
        onLeave()
    }
    const isSearchingVolunteer = !volunteerJoinedData
    useEffect(() => {
        if (!isSearchingVolunteer) {
            navigation.navigate(routerConstants.CHAT)
        }
    }, [isSearchingVolunteer]);
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            style={styles.containerGradient}>
            <StatusBar hidden={false} style={'auto'} animated={true} backgroundColor={'#89BDE7'}
                       translucent={true}/>
            <Box alignItems={'flex-start'}>
                <ArrowBack styleTouchable={styles.right} img={arrowLeftImg}
                           goBackPress={goBackPress}/>
                <Box mt={2}>
                    <Text style={styles.textHeader}>Searching for a volunteer for you!</Text>
                    <Text style={styles.text}>It will take no longer than 10 minutes.</Text>
                </Box>
            </Box>
            <Box alignItems={'center'} justifyContent={'center'} flex={1}>
                <Box w={200} mb={3}>
                    <Animatable.View animation={'bounce'} easing={"ease-in"} iterationCount={10}>
                        <Button styleText={styles.txtBtnStart} styleContainer={styles.btnStart}
                                onPress={onPressGoGameTest} textBtn={'Take a test'}/>
                    </Animatable.View>
                </Box>
                <Animatable.View animation={'pulse'} delay={1000} iterationCount={30}>
                    <Image style={styles.imgPeople} source={PeoplesWitchElements}/>
                </Animatable.View>
            </Box>
            <Box alignItems={'center'}>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'space-evenly'}
                     alignItems={'flex-end'}
                     mb={3}>
                    <Image style={styles.imgFooter} source={imgPeople3}/>
                    <Image style={{width: 90, height: 90}} source={imgPeople}/>
                    <Image style={styles.imgFooter} source={imgPeople2}/>
                </Box>
            </Box>
        </LinearGradient>
    );
})
const styles = StyleSheet.create({
    containerGradient: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 20 : 30
    },
    btnStart: {
        backgroundColor: colors.greenMedium,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtBtnStart: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 23,
        color: colors.white,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    imgFooter: {
        width: 47,
        height: 47
    },
    imgPeople: {
        width: 234,
        height: 226
    },
    right: {
        position: "relative",
        right: 20
    },
    textHeader: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 5
    },
    text: {
        fontSize: 16,
        opacity: 0.5,
        color: colors.white,
        fontWeight: 'normal'
    },
})

export default SearchingVolunteer;
