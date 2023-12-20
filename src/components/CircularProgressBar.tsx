import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CircularProgressBarType = {
    donePatients: number
}
const CircularProgressBar = React.memo(({donePatients}: CircularProgressBarType) => {
    const progressPatientsOfWeek = () => {
        if (donePatients < 5) {
            return {borderTopWidth: 0}
        } else if (donePatients < 10) {
            return {borderTopWidth: 5, borderLeftWidth: 5}
        } else if (donePatients < 15) {
            return {borderTopWidth: 5, borderLeftWidth: 5, borderBottomWidth: 5}
        } else {
            return {
                borderBottomWidth: 5,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderTopWidth: 5,
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={[styles.circleOuter, progressPatientsOfWeek()]}>
                <View style={styles.circleInner}>
                    <Text style={styles.text}>{donePatients}</Text>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    circleOuter: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderColor: '#7EA7D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleInner: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        padding: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#51658D',
        fontSize: 22,
        fontWeight: 'bold',
    },
});
export default CircularProgressBar;
