import React from 'react';
import {Image, Modal, SafeAreaView, StyleSheet, Text, View} from "react-native";
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
import {BaseWrapperComponent} from "../baseWrapperComponent";
import {routerConstants} from "../../constants/routerConstants";

const SearchingVolunteerModal = ({navigation, visible, onLeave}) => {
    const goBackPress = () => {
        onLeave()
    }
    return (
        <Modal visible={visible}>
            <BaseWrapperComponent styleSafeArea={{marginTop: 0}}>
                <LinearGradient
                    colors={['#89BDE7', '#7EA7D9']}
                    style={{flex: 1, width: '100%', justifyContent: 'space-between', paddingHorizontal: 16}}>
                    <View style={{alignItems: 'flex-start'}}>
                        <ArrowBack styleTouchable={styles.right} img={checkLanguage ? arrowBack : arrowLeftImg}
                                   goBackPress={goBackPress}/>
                        <Box mt={3}>
                            <Text style={styles.textHeader}>Searching for a volunteer for you!</Text>
                            <Text style={styles.text}>It will take no longer than 10 minutes. </Text>
                        </Box>
                    </View>
                    <Box alignItems={'center'}>
                        <Image style={styles.imgPeople} source={PeoplesWitchElements}/>
                    </Box>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.footerBlock}>
                            <Image style={styles.imgFooter} source={imgPeople3}/>
                            <Image style={{width: 100, height: 100}} source={imgPeople}/>
                            <Image style={styles.imgFooter} source={imgPeople2}/>
                        </View>
                    </View>
                </LinearGradient>
            </BaseWrapperComponent>
        </Modal>
    );
};
const styles = StyleSheet.create({
    footerBlock: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    imgFooter: {
        width: 57,
        height: 57
    },
    imgPeople: {
        width: 254,
        height: 246
    },
    right: {
    position: "relative",
        right: 20
    },
    textHeader: {
        fontSize: 27,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 5
    },
    text: {
        fontSize: 16,
        opacity: 0.5,
        color: colors.white,
    },
})

export default SearchingVolunteerModal;
