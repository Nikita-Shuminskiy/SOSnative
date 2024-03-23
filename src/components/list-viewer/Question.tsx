import React, {memo} from 'react';
import {Box, Text} from "native-base";
import {TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {arrowRightSvg, messageSvg} from "../../assets/svg/svg";
import {checkLanguage} from "../../utils/utils";
import {VolunteerActionType} from "../../store/SocketStore/type";

type DashboardElementProps = {
    element: VolunteerActionType
    onPress: (elem: VolunteerActionType) => void
    isActiveElement: boolean
}
const DashboardElement = memo(({element, onPress, isActiveElement}: DashboardElementProps) => {
    return (
        <TouchableOpacity style={{marginVertical: 4, borderRadius: 16}} onPress={() => onPress(element)}>
            <Box borderRadius={16} padding={2}
                 justifyContent={'space-evenly'}
                 flexDirection={checkLanguage ? 'row-reverse' : 'row'}
                 backgroundColor={colors[element.color]}>
                <SvgXml xml={messageSvg} width={12} height={12}/>
                <Text marginX={2} flex={1} fontWeight={'normal'} fontSize={13}
                      color={colors.white}>{element.text.trim()}</Text>
                <SvgXml xml={arrowRightSvg} width={12} height={12}/>
            </Box>
        </TouchableOpacity>
    );
})

export default DashboardElement;