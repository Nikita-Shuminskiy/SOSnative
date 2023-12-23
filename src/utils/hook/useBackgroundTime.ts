import {useEffect, useRef, useState} from "react"
import {deviceStorage} from "../storage/storage"
import * as Updates from "expo-updates"
import {AppState} from "react-native"
import SocketStore from "../../store/SocketStore/socket-store";
import {Socket} from "socket.io-client";
type useBackgroundTimeProps = {
	backgroundHandler: (time: number) => void
	socket: Socket | null
}
export const useBackgroundTime = ({backgroundHandler, socket}: useBackgroundTimeProps) => {
/*	const appState = useRef(AppState.currentState);*/
	const handleAppStateChange = async (nextAppState) => {
	/*	if (
			appState.current.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			console.log('connect')
			socket?.connect()
		}else {
			console.log('dis')
			socket?.disconnect()
		}
		appState.current = nextAppState;*/
		if (nextAppState === "background") {
			// Пользователь перешел в фоновый режим, начнем отслеживать время
			const timeBackground = new Date().getTime()
			await deviceStorage.saveItem("timeBackground", JSON.stringify(timeBackground))
		} else if (nextAppState === "active") {
			const timeBackground = await deviceStorage.getItem("timeBackground")
			const timeActive = new Date().getTime()
			if (!timeBackground) {
				await deviceStorage.removeItem("timeBackground")
				return
			}
			let elapsedMinutes = Math.floor((timeActive - Number(timeBackground)) / 60000) // Преобразовать миллисекунды в минуты
			backgroundHandler(elapsedMinutes)
			elapsedMinutes = 0
			await deviceStorage.removeItem("timeBackground")
		}
	}
	useEffect(() => {
		const appStateSubscription = AppState.addEventListener("change", handleAppStateChange)
		return () => {
			appStateSubscription.remove()
		}
	}, [])
}
