/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

//Listener 4 will run when app is active kill or background state..
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Listener 4 ===>', remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
