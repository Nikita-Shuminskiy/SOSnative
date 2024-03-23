import React, {useCallback} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Text} from "react-native";
import {DATA_QUESTIONS, QuestionsType} from "./common";
import TextQuestion from "../../../components/list-viewer/TextQuestion";


const QuestionsTest = () => {
    const onPressQuestion = useCallback((question: QuestionsType) => {

    }, [])
    const questions: any = DATA_QUESTIONS.map((question) => <TextQuestion question={question} onPress={onPressQuestion}
                                                                          key={question.id}/>)
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Text>
                Welcome to Your Support Journey! While we're getting your support companion ready, let's get to know
                each other a bit better. Your answers will help us tailor the support you receive. And don't worry, we
                like to keep things light-hearted around here!
            </Text>
            {questions}
            <Text>
                Thank you for sharing a piece of your world with us!
                Remember, it's okay to not be okay, and it's even better to share a laugh or two, even in tough times.
                Your support companion will be with you shortly to continue this journey together. Hang tight, and
                remember, we're here for you, one step (or one chuckle) at a time.
            </Text>
        </BaseWrapperComponent>
    );
};

export default QuestionsTest;