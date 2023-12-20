import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import ImgMusic from '../assets/images/addMusick.png'
import AddImg from '../assets/images/Add-image.png'
import ImgVideo from '../assets/images/addVideo.png'

const DashboardMusicVideoPictures = () => {
    const onPressAddImg = () => {

    }
    const onPressAddMusic = () => {

    }
    const onPressAddVideo = () => {

    }
    return (
        <LinearGradient
            colors={['#89BDE7', '#7EA7D9']}
            style={{...styles.container}}>

            <TouchableOpacity onPress={onPressAddImg} style={styles.blockImg}>
                <Image style={styles.img} source={AddImg}/>
                <Text style={styles.text}>Add{'\n'}image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressAddMusic} style={styles.blockImg}>
                <Image style={styles.img} source={ImgMusic}/>
                <Text style={styles.text}>Add{'\n'}music</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressAddVideo} style={styles.blockImg}>
                <Image style={styles.img} source={ImgVideo}/>
                <Text style={styles.text}>Add{'\n'}video</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    blockImg: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10
    },
    text: {
        color: 'white',
        fontSize: 13,
        marginRight: 5,
        marginLeft: 5
    },
    img: {
        width: 60,
        height: 60
    },
    container: {
        height: 96,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default DashboardMusicVideoPictures;
