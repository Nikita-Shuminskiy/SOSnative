import React, {useEffect, useState} from 'react';
import {Box, Button, Text} from "native-base";
import {colors} from "../../../assets/colors/colors";
import {StyleSheet, TouchableOpacity} from "react-native";
import {generateBoxShadowStyle} from "../../../utils/utils";
import {createAlert} from "../../../components/alert";

type ColorType = { color: string, opacity: number }
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return {
        color,
        opacity: 1
    }
};
const ColorTest = ({closeTest,}) => {
    const [colorPalette, setColorPalette] = useState<ColorType[]>([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [round, setRound] = useState(1);
    const handleColorPress = (currColor: ColorType) => {
        if (currColor.opacity === 0.2) return
        if (selectedColors?.length === 10) {
            return
        }
        setSelectedColors([...selectedColors, currColor]);
        const updateColors = colorPalette.map((color) => {
            if (color.color === currColor.color) {
                return {...color, opacity: 0.2}
            }
            return color
        })
        setColorPalette(updateColors)
    };
    useEffect(() => {
        generateColors();
    }, [round]);

    const generateColors = () => {
        const newColors = Array.from({length: 10}, () => generateRandomColor());
        setColorPalette(newColors);
        setSelectedColors([]);
    };
    const handleContinuePress = () => {
        if (round < 3) {
            setRound(prevState => prevState + 1)
            generateColors()
            return
        } else {
            createAlert({
                title: 'Message',
                message: 'Thank you for taking the test, expect a volunteer',
                buttons: [{onPress: closeTest, text: 'Ok', style: 'default'}]
            })
        }
    };
    const generateShadow = generateBoxShadowStyle(5, 5, '#171717', 0.2, 3, 10, '#171717')
    return (
        <Box flex={1} alignItems={'center'} justifyContent="space-evenly">
            <Box alignItems={'center'}>
                <Text fontSize={20} color={colors.blue} fontWeight={'500'}>
                    Choose the colors in any order you like
                </Text>
                <Text fontSize={18} color={colors.purple} fontWeight={'500'}>
                    {` Test is passed ${round} out of 3`}
                </Text>
            </Box>
            <Box flexDirection="row" flexWrap="wrap" justifyContent="center">
                {colorPalette.map((color, index) => (
                    <TouchableOpacity
                        key={color.color}
                        onPress={() => handleColorPress(color)}
                        style={{
                            ...generateShadow,
                            backgroundColor: color.color,
                            opacity: color.opacity,
                            ...styles.colorBlock
                        }}
                    />
                ))}
            </Box>
            <Box flexDirection={'row'} minHeight={20} mt={2} flexWrap={'wrap'}>
                {
                    selectedColors && selectedColors.map((color) => {
                        return <Box key={color.color} w={10} h={10} m={1} borderRadius={20} style={{
                            ...generateShadow,
                            backgroundColor: color.color,
                            opacity: color.opacity,
                        }}/>
                    })
                }
            </Box>
            {
                <Box w={'100%'} alignItems={'center'}>
                    <Button size={'lg'} w={200} borderRadius={8} isDisabled={selectedColors.length !== 10}
                            backgroundColor={colors.purple}
                            onPress={handleContinuePress} mt={5}>
                        <Text fontWeight={'normal'} fontSize={15} color={colors.white}>Continue</Text>
                    </Button>
                </Box>
            }
        </Box>
    );
};
const styles = StyleSheet.create({
    colorBlock: {
        width: 80,
        height: 80,
        borderRadius: 16,
        margin: 3,
    }
})
export default ColorTest;