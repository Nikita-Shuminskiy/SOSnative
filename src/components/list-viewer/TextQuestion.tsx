import React, {memo} from 'react';
import {Box, Text} from "native-base";
import {checkLanguage, generateBoxShadowStyle} from "../../utils/utils";
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity} from "react-native";
import {QuestionsType} from "../../screen/patientScreens/VoluntersWaiting/common";

type TextQuestionProps = {
    question: QuestionsType
    onPress: (elem: QuestionsType) => void
}
const TextQuestion = ({question, onPress}: TextQuestionProps) => {
    const generateShadow = generateBoxShadowStyle(5, 5, '#171717', 0.2, 3, 10, '#171717')
    return (
        <TouchableOpacity style={{marginVertical: 4, borderRadius: 16, ...generateShadow}}
                          onPress={() => onPress(question)}>
            <Box borderRadius={16} padding={2}
                 justifyContent={'space-evenly'}
                 flexDirection={checkLanguage ? 'row-reverse' : 'row'}
            >
                <Text marginX={2} flex={1} fontWeight={'normal'} fontSize={13}
                      color={colors.white}>{question.text}</Text>
            </Box>
        </TouchableOpacity>
    );
};

export default memo(TextQuestion)