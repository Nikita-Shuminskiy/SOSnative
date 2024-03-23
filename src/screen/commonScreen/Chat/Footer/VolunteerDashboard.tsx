import React, {memo, useCallback, useState} from 'react';
import {Box} from "native-base";
import {colors} from "../../../../assets/colors/colors";
import {checkLanguage} from "../../../../utils/utils";
import DashboardElement from "../../../../components/list-viewer/DashboardElement";
import Question from "../../../../components/list-viewer/Question";
import {ScrollView} from "react-native";
import {MessagePayloadType, VolunteerActionType, VolunteerToolboxType} from "../../../../store/SocketStore/type";

type VolunteerDashboardProps = {
    onSendMessage: (payload: MessagePayloadType) => void
    toolboxVolunteer: VolunteerToolboxType[]
}

const VolunteerDashboard = memo(({onSendMessage, toolboxVolunteer}: VolunteerDashboardProps) => {
    const [currentDataQuestions, setIsCurrentDataQuestions] = useState<VolunteerToolboxType | null>(null)
    const onPressSelectCurrentQuestions = useCallback((element: VolunteerToolboxType) => {
        if (element.id === currentDataQuestions?.id) return setIsCurrentDataQuestions(null)
        setIsCurrentDataQuestions(element)
    }, [currentDataQuestions?.id])
    const onPressSelectQuestion = useCallback((element: VolunteerActionType) => {
        onSendMessage({tool: element.value})
        setIsCurrentDataQuestions(null)
    }, [])
    const renderItem = useCallback(({item}: { item: VolunteerToolboxType }) => {
        const isActiveElement = item?.id === currentDataQuestions?.id
        return (
            <DashboardElement
                key={item?.id}
                isActiveElement={isActiveElement}
                element={item}
                onPress={onPressSelectCurrentQuestions}
            />
        );
    }, [currentDataQuestions?.id])
    const renderDataQuestion = useCallback((question: VolunteerActionType) => {
        const isActiveElement = question.id === currentDataQuestions?.id
        return (
            <Question
                key={question.id}
                isActiveElement={isActiveElement}
                element={question}
                onPress={onPressSelectQuestion}
            />
        );
    }, [])
    return (
        <Box paddingX={2} paddingY={2} w={'100%'}
             backgroundColor={colors.blueLight}>
            {
                currentDataQuestions &&

                <Box mb={2} style={{maxHeight: 400}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {currentDataQuestions.data.map((question) => {
                            return renderDataQuestion(question)
                        })}
                    </ScrollView>
                </Box>

            }
            {
                <Box flexDirection={checkLanguage ? 'row-reverse' : 'row'} justifyContent={'space-around'}
                     w={'100%'}>
                    {toolboxVolunteer.map((question) => {
                        return renderItem({item: question})
                    })}
                </Box>
            }
        </Box>
    );
})

export default VolunteerDashboard;