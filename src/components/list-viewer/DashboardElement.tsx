import React, {memo} from 'react';
import {Box, Text} from "native-base";
import {Pressable} from "react-native";
import {colors} from "../../assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {generateBoxShadowStyle} from "../../utils/utils";
import {VolunteerToolboxType} from "../../store/SocketStore/type";
import {IMG_TOOLBOX} from "../../screen/commonScreen/Chat/Footer/Constants";

type DashboardElementProps = {
    element: VolunteerToolboxType
    onPress: (elem: VolunteerToolboxType) => void
    isActiveElement: boolean
}
const DashboardElement = memo(({element, onPress, isActiveElement}: DashboardElementProps) => {
    const coloredSvg = IMG_TOOLBOX[element?.image]?.replace(
        new RegExp(`stroke="${colors[element.color]}"`, "g"),
        `stroke="${isActiveElement ? colors.white : colors[element.color]}"`
    );

    const generateShadow = generateBoxShadowStyle(1, 1, '#171717', 0.2, 1, 2, '#171717')
    return (
        <Pressable style={{alignItems: 'center', marginHorizontal: 5}} onPress={() => onPress(element)}>
            <Box borderRadius={50} style={generateShadow} w={12} h={12} alignItems={'center'} justifyContent={'center'}
                 backgroundColor={isActiveElement ? colors[element.color] : colors.blueLight} p={5}>
                {
                    coloredSvg && <SvgXml xml={coloredSvg} width={20} height={20}/>
                }
            </Box>
            <Text fontWeight={'normal'} fontSize={13} color={colors.blue}>{element?.name}</Text>
        </Pressable>
    );
})

export default DashboardElement;