import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import smileGood from "../assets/images/coleredSmile/smileGood.png";
import smileOk from "../assets/images/coleredSmile/smileOk.png";
import smileAverage from "../assets/images/coleredSmile/smileAverege.png";
import smileBad from "../assets/images/coleredSmile/smileBad.png";
import smileVeryBad from "../assets/images/coleredSmile/smileVeryBad.png";
import {checkLanguage} from "../utils/utils";
import * as Animatable from "react-native-animatable";

type SliderEmotionalStateProps = {
    onValueChange: (value) => void
}
const SliderEmotionalState = ({onValueChange}: SliderEmotionalStateProps) => {
    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (value) => {
        onValueChange(value)
        setSliderValue(value);
    };

    const getGradientColors = () => {
        return ['#205C26', '#82D764', '#ee8238', '#EB5231', '#C62B2B'];
    };
    const getThumbColor = (value) => {
        const colorRange = getGradientColors();
        const scaledValue = (value - 1) / 9; // Масштабирование значения к диапазону от 0 до 1
        const index = Math.floor(scaledValue * (colorRange.length - 1)); // Вычисление индекса в массиве цветов

        return colorRange[index] ?? 'green'
    };
    const isActiveSmile = (minValue, maxValue) => {
        return sliderValue >= minValue && sliderValue <= maxValue;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={getGradientColors()}
                style={styles.colorLine}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
            >
                {/*  <Slider
                    thumbTintColor={'#89BDE7'}
                    value={sliderValue}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    thumbStyle={styles.thumb }
                style={styles.slider}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                />
                */}
            </LinearGradient>
            <View style={styles.smileContainer}>
                <TouchableOpacity onPress={() => handleSliderChange(0)} style={[styles.smileBlock]}>
                    <Animatable.Image
                        animation={isActiveSmile(0, 0) ? 'rubberBand' : 'swing'}
                        duration={1500}
                        style={[styles.img, isActiveSmile(0, 0) && styles.activeSmileBlock]}
                        source={smileGood}
                    />
                    <Text style={{...styles.smileText, color: '#205C26'}}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSliderChange(1)} style={[styles.smileBlock]}>
                    <Animatable.Image
                        animation={isActiveSmile(1, 3) ? 'rubberBand' : 'swing'}
                        style={[styles.img, isActiveSmile(1, 3) && styles.activeSmileBlock]}
                        source={smileOk}
                    />
                    <Text style={{...styles.smileText, color: '#82D764'}}>1-3</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSliderChange(4)}  style={[styles.smileBlock]}>
                    <Animatable.Image
                        animation={isActiveSmile(4, 6) ? 'rubberBand' : 'swing'}
                        style={[styles.img, isActiveSmile(4, 6) && styles.activeSmileBlock]}
                        source={smileAverage}
                    />
                    <Text style={{...styles.smileText, color: '#BB8055'}}>4-6</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSliderChange(7)}  style={[styles.smileBlock]}>
                    <Animatable.Image
                        animation={isActiveSmile(7, 9) ? 'rubberBand' : 'swing'}
                        style={[styles.img, isActiveSmile(7, 9) && styles.activeSmileBlock]}
                        source={smileBad}
                    />
                    <Text style={{...styles.smileText, color: '#EB5231'}}>7-9</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSliderChange(10)}  style={[styles.smileBlock]}>
                    <Animatable.Image
                        animation={isActiveSmile(10, 10) ? 'rubberBand' : 'swing'}
                        style={[styles.img, isActiveSmile(10, 10) && styles.activeSmileBlock]}
                        source={smileVeryBad}
                    />
                    <Text style={{...styles.smileText, color: '#C62B2B'}}>10</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    activeSmileBlock: {
        borderColor: '#89BDE7',
        borderWidth: 3,
        borderRadius: 50,
    },
    smileText: {
        fontSize: 18,
        fontWeight: '500',
    },
    smileBlock: {
        alignItems: 'center'
    },
    smileContainer: {
        position: 'relative',
        top: 20,
        flexDirection: checkLanguage ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    img: {
        width: 45,
        height: 45
    },
    thumb: {
        width: 40,
        height: 42,
        borderRadius: 50,
        zIndex: 20
    },
    slider: {
        position: 'absolute',
        top: -5,
        width: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    colorLine: {
        borderRadius: 16,
        height: 30,
        width: '100%',
        flex: 1,
    },
    track: {
        height: 5,
        backgroundColor: 'transparent',
    },
});
export default memo(SliderEmotionalState)
