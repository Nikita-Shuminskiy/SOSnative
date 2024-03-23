import {useCallback, useEffect} from 'react'
import { BackHandler } from 'react-native'
import {useFocusEffect, useIsFocused} from "@react-navigation/native";

export const useGoBack = (goBackPress) => {
	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			BackHandler.addEventListener('hardwareBackPress', goBackPress)
		} else {
			BackHandler.removeEventListener('hardwareBackPress', goBackPress)
		}
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', goBackPress)
		}
	}, [isFocused]);
}
