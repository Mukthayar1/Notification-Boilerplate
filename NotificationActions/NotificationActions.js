import { PermissionsAndroid, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const NotificationPermission = async (setFcmToken) => {
    if (Platform.OS == 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        GetFcmToken(setFcmToken)
    } else {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
            GetFcmToken(setFcmToken)
        }
    }
};

const GetFcmToken = async (setFcmToken) => {
    try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            setFcmToken(fcmToken)
        }
    } catch (error) {
        console.log('error', error)
    }
};

const NotificationListener = () => {

    //Listener 1 when app is in the active state
    messaging().onMessage(async remoteMessage => {
        console.log('Listener 1 ===>', remoteMessage);
        DisplayNotification()
    });

    //Listener 2 activates exclusively upon the user clicking a notification while the app is in the background state
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log('Listener 2 ===>', remoteMessage)
    });

    //Listener 3 activates exclusively upon the user clicking a notification while the app is in the kill state
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log('Listener 3 ===>', remoteMessage)
            }

        });


}

const DisplayNotification = async () => {

    const channelId = await notifee.createChannel({
        id: 'notification',
        name: 'notification Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
        },
    });
}



export {
    NotificationPermission,
    GetFcmToken,
    NotificationListener,
    DisplayNotification
}