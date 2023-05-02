import React from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {StyleSheet} from "react-native";

const Backdrop = () => {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(255,255,255,0.04)','rgb(213,227,254)', '#d5e3fe']}
            //start={{ x: 1, y: 0.1 }}
            locations={[0.14, 0.8, 2]}
            start={{x: 0.2, y: 0.1}}
            //end={{x: 0, y: 1}}
            style={styles.background}
        />
    );
};
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 350,
        zIndex: -1
    },
})

export default Backdrop;