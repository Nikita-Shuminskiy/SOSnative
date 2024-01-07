import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {colors} from "../../assets/colors/colors";
import manNoProblem from "../../assets/images/people_problem/people-no-problem.png";
import circle from "../../assets/images/circle.png";
import React from "react";
import {
    checkLanguage,
    getAllDescriptions,
    getCurrentConditionRateData,
    getCurrentPeopleProblem,
    getTimeElapsedFromNow
} from "../../utils/utils";
import {RoomType} from "../../api/type";


type PatientProps = {
    patient: RoomType;
    selectedPatient: string
    onPress: (id: string) => void;
};
export const Patient = React.memo(({patient, onPress, selectedPatient}: PatientProps) => {
    const timeElapsed = getTimeElapsedFromNow(patient.createdAt);

    const isActivePatient = selectedPatient === patient.id
    const conditionRate = getCurrentConditionRateData(patient?.conditionRate)

    const getProblem = getCurrentPeopleProblem(patient.affliction)
    const currentAllDescriptions: string | string[] = getAllDescriptions(patient.affliction, true)
    return <TouchableOpacity style={{
        ...styles.container, borderWidth: isActivePatient ? 1 : 0,
        flexDirection: checkLanguage ? 'row-reverse' : 'row'
    }} onPress={() => onPress(patient.id)}>
        <View style={styles.textContainer}>
            <Text style={{
                color: colors.blue,
            }}>{patient.patient.name}{' '}<Text style={styles.textTime}>{timeElapsed}</Text></Text>
            <Text style={styles.textDescription}>{patient.description}</Text>
        </View>

        <View style={styles.imageContainer}>
            <View style={{...styles.blockProblemPatient, flexDirection: checkLanguage ? 'row-reverse' : 'row'}}>
              <View style={{ marginLeft: checkLanguage ?  10 : 0 }}>
                  {
                      getProblem.length && getProblem.map((problem) => {
                          return <View key={problem.id} style={[styles.dot, styles?.[problem.title]]}/>
                      })
                  }
                  <Image source={manNoProblem}/>
              </View>
                <View style={{ marginLeft: checkLanguage ?  0 : 20 }}>
                    {
                        Array.isArray(currentAllDescriptions) && currentAllDescriptions.map((problem, index) => {
                            return <Text key={index} style={{color: '#1F8298', fontSize: 10,}}>{problem}</Text>
                        })
                    }
                </View>
            </View>
            <View>
                <ImageBackground
                    source={circle}
                    style={{...styles.smile, left: checkLanguage ? -10 : 15}}
                >
                    <Image style={{width: 38, height: 38}} source={conditionRate?.img}/>
                </ImageBackground>
            </View>
        </View>
    </TouchableOpacity>
})
const styles = StyleSheet.create({
    rightHand: {
        width: 5,
        left: checkLanguage ? 25 : 0,
        top: 48,
    },
    leftHand: {
        width: 5,
        left: checkLanguage ? 0 : 25,
        top: 48,
    },
    dot: {
        zIndex: 10,
        position: 'absolute',
        borderRadius: 16,
        backgroundColor: '#1F8298',
        height: 5,
    },
    stomach: {
        width: 5,
        left: checkLanguage ? 5 : 20,
        top: 43,
    },
    heart: {
        width: 5,
        left: checkLanguage ? 5 : 18,
        top: 30,
    },
    head: {
        width: 10,
        left: 10,
        top: 5,

    },
    blockProblemPatient: {
        alignItems: 'center',
        position: 'relative',
        top: 20,
        right: checkLanguage ? -20 : 20
    },
    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 5,
        paddingHorizontal: 8,
        maxWidth: 200
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        marginBottom: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#D5E3FE'
    },
    smile: {
        width: 68,
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        left: 15,
        top: 20
    },
    textDescription: {
        textAlign: 'left',
        marginTop: 10,
        marginRight: 5,
        color: '#51658D',
        fontWeight: '500',
        fontSize: 14,
        width: '100%',
        maxWidth: 220
    },
    textTime: {
        color: '#1F8298',
    },
    textName: {color: colors.blue},

})
