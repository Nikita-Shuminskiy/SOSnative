import React from 'react';
import {Pressable, StyleSheet} from "react-native";
import * as Animatable from "react-native-animatable";

const CheckBox = ({onTouchEndCheckedHandler, isChecked, style, imgActive, imgNotActive}) => {
    return (
        <Pressable onTouchEnd={() => onTouchEndCheckedHandler('head')}>
            <Animatable.Image
                animation={isChecked ? 'zoomIn' : 'tada'}
                style={style}
                source={isChecked ? imgActive : imgNotActive}/>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    checkbox: {
        position: 'absolute',
        borderWidth: 0,
        backgroundColor: '#C1D6FF',
        borderRadius: 30,
    },

});
export default CheckBox;