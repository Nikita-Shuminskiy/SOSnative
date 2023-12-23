import { useEffect, useState } from 'react'
import { LoadingEnum } from '../../store/types/types'
import NetInfo from '@react-native-community/netinfo'
import NotificationStore from '../../store/NotificationStore/notification-store'

export const useInternetConnected = () => {
	const [isConnected, setIsConnected] = useState(true)


	const checkInternetConnection = async () => {
		const { setIsLoading } = NotificationStore
		setIsLoading(LoadingEnum.fetching)
		try {
			const netInfoState = await NetInfo.fetch()
			setIsConnected(netInfoState.isConnected)
		} catch (e) {

		} finally {
			setIsLoading(LoadingEnum.success)
		}
	}

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected)
		})
		return () => {
			unsubscribe()
		}

	}, [])
	return {
		isConnected,
		checkInternetConnection
	}
}
