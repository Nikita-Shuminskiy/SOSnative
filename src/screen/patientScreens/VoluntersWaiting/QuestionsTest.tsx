import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../../components/baseWrapperComponent";
import {Pressable, StyleSheet} from "react-native";
import {DATA_QUESTIONS, QuestionsType} from "./common";
import * as Animatable from 'react-native-animatable'
import Button from "../../../components/Button";
import {colors} from "../../../assets/colors/colors";
import {Box, Text} from "native-base";


const QuestionsTest = ({closeTest}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const nextQuestion = () => {
        if (currentQuestion < DATA_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            closeTest()
        }
    };
    const handleAnswerSelection = (answerId) => {
        setSelectedAnswer(answerId);
    };
    const currentQuestionData: QuestionsType = DATA_QUESTIONS[currentQuestion];
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true} styleSafeArea={{paddingTop: 0}}>
            {currentQuestionData?.img &&
                <Animatable.Image animation={'pulse'} easing={"ease-in"} source={currentQuestionData.img}
                                  style={{width: '100%', height: 300}}/>}
            <Animatable.View style={styles.container} animation={'zoomIn'} easing={"ease-in"}>

                <Text mt={2} style={[styles.text, {fontSize: 22}]}>{currentQuestionData.text}</Text>

                <Box mt={2} mb={5}>
                    {currentQuestionData?.answers?.map(answer => (
                        <Animatable.View animation={selectedAnswer === answer.id ? 'tada' : 'pulse'} key={answer.id}>
                            <Pressable
                                style={{
                                    borderRadius: 16,
                                    marginTop: 10,
                                    padding: 10,
                                    backgroundColor: selectedAnswer === answer.id ? colors.blueMedium : colors.blueLightMedium
                                }}
                                onPress={() => handleAnswerSelection(answer.id)}
                            >
                                <Text style={[styles.text, {color: colors.white}]}>{answer.text}</Text>
                            </Pressable>
                        </Animatable.View>
                    ))}
                </Box>

                <Button styleText={styles.txtBtnStart} styleContainer={styles.btnStart}
                        onPress={nextQuestion}
                        textBtn={currentQuestionData.isFirst ? 'let\'s do it. :)' : currentQuestionData.isLast ? 'Go to waiting' : 'Next question'}/>
            </Animatable.View>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,


        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btnStart: {
        backgroundColor: colors.blueMedium,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtBtnStart: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: colors.white,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        lineHeight: 32,
        color: colors.black,
        fontWeight: '500'
    },
})
export default QuestionsTest;