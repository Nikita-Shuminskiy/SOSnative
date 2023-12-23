import { useEffect, useState } from 'react'
import {PermissionsAndroid, PermissionStatus} from "react-native";


export const usePermissions = () => {
	const [notificationStatus, setNotificationStatus] = useState<string>('undetermined')
	const askNotificationPermissionHandler = async () => {
		const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
		return permission
	}


	useEffect(() => {
		(async () => {
			try {
				const permission: PermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
				setNotificationStatus(permission)
			} catch (e) {

			} finally {
			}
		})()
	}, [])

	return {
		askNotificationPermissionHandler,
		notificationStatus,
	}
}
