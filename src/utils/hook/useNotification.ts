import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from 'expo-notifications';
import AuthStore from "../../store/AuthStore/auth-store";
import { routerConstants } from "../../constants/routerConstants";
import { authApi } from "../../api/api";
import { getInfoAboutPhone } from "../utils";
import { Platform } from "react-native";
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
const sendToken = async (token) => {
    const { version, name, deviceName } = getInfoAboutPhone();
    return await authApi.sendToken({
        token,
        device: `${name ?? ''} ${deviceName}`,
        platform: Platform.OS,
        osVersion: String(version),
    });
}

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    // Set up the notification handler for the app
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

export const useNotification = () => {
    const { user, setRedirectFromNotification, isAuth } = AuthStore;

    useEffect(() => {
        if (isAuth) {
            if (requestUserPermission()) {
                messaging()
                    .getToken()
                    .then((token) => {
                        sendToken(token);
                    });
            }
            // Handle user clicking on a notification and open the screen
            const handleNotificationClick = () => {
                if (user.role === 'volunteer') {
                    return setRedirectFromNotification(routerConstants.DASHBOARD);
                }
            };

            // Listen for user clicking on a notification
            const notificationClickSubscription =
                Notifications.addNotificationResponseReceivedListener(
                    handleNotificationClick
                );

            // Handle user opening the app from a notification (when the app is in the background)
            messaging().onNotificationOpenedApp((remoteMessage) => {
                console.log('onNotificationOpenedApp', remoteMessage)
                handleNotificationClick();
            });

            // Check if the app was opened from a notification (when the app was completely quit)
            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                    bypassDnd: true,
                });
            }
            // Handle push notifications when the app is in the background
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                // Configure notification appearance
                const notification = {
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    customDismissAction: true,
                    data: { accepted: true }
                };

                // Schedule the notification with a null trigger to show immediately
                await Notifications.scheduleNotificationAsync({
                    content: notification,
                    trigger: 3000,
                });
            });

            // Handle push notifications when the app is in the foreground
            const handlePushNotification = async (remoteMessage) => {

                // Configure notification appearance
                const notification = {
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    customDismissAction: true,
                };


                // Schedule the notification with a null trigger to show immediately
                await Notifications.scheduleNotificationAsync({
                    content: notification,
                    trigger: null,
                });
            };

            const unsubscribe = messaging().onMessage(handlePushNotification);

            return () => {
                unsubscribe();
                notificationClickSubscription.remove();
            };
        }
    }, [isAuth]);
}
