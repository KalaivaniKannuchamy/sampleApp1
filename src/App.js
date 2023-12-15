import React, { useRef, useState, useEffect } from 'react';
import { Platform, StyleSheet, AppState, Text } from 'react-native';
import ThemeProvider from './lib/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigtaor from './navigators/AuthNavigator';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import firebase from '@react-native-firebase/app'
import { Alert, AsyncStorage } from './components/common';
import AsyncStorageKeys from './lib/AsyncStorageKeys';
// import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './components/common/RootNavgation';
import { deviceUniqueId } from './lib/globalFunctions';
const App = (props) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const handleDynamicLink = link => {
    // Handle dynamic link inside your own application
    console.log("link----->!", link);
    if (link && link.url == 'https://dvendors.mrsholdings.com/preregisterd') {
      checkDeeplinkRedirection('true')
    } else {
      // setIsLinkClicked('false')
      checkDeeplinkRedirection('false')
    }
  };


  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
      } else {
       
      }
      console.log('appState.current--.1', appState.current)
      appState.current = nextAppState;
      console.log('appState.current--.2', appState.current)
      //console.log("nextAppState===>", nextAppState,appState.current, appState.current.match(/inactive|background/) && nextAppState === "active");
      setAppStateVisible(appState.current);
    });

    firebase.initializeApp()
    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)
    });

    firebaseMessaging()

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      unsubscribe();
      // setIsLinkClicked(null)
      subscription.remove();
    };


  }, [])

  const loadDeviceToken = async (token) => {
    console.log('deviceToken=====', token)
    try {
      await AsyncStorage.saveData(AsyncStorageKeys.token, token)
    } catch (e) {
      console.log(e)
    }
  }

  // PushNotification.configure({
  //   // user accepted notification permission - register token
  //   onRegister: function (tokenData) {
  //     const { token } = tokenData;
  //     loadDeviceToken(token)

  //   },
  //   onNotification: function (notification) {
  //     console.log('REMOTE NOTIFICATION ==>', notification)
  //   },
  //   // outlining what permissions to accept
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true
  //   }
  // });

  const firebaseMessaging = () => {
    messaging().getToken().then((token) => {
      if (Platform.OS != 'ios') {
        console.log('token--->', token);
        AsyncStorage.saveData(AsyncStorageKeys.token, token)
      }
      else {
        AsyncStorage.saveData(AsyncStorageKeys.token, `${deviceUniqueId}`)
      }
    })
      .catch((e) => {
        console.log("e=======", e);
        AsyncStorage.saveData(AsyncStorageKeys.token, `${deviceUniqueId}`)
      })

    /* Called when notification received and app is in foreground */
    messaging().onMessage(async (remoteMessage) => {
      Alert.simpLeAlert("",
        remoteMessage.notification.body,
        //  remoteMessage.notification.title,
      );
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    /* Check whether an initial notification is available */
    messaging().getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  }


  const checkDeeplinkRedirection = async (isfromLink) => {
    isfromLink === "true" ? 
    RootNavigation.replace("AuthModuleNavigtaor", {
      screen: "EmailVerification"
    })
    :
     null
    // await AsyncStorage.saveData(AsyncStorageKeys.is_from_Link, isfromLink)
    // console.log('props.route------>', props)

  }
  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <AuthNavigtaor />
    </NavigationContainer >

  );
};

export default () => {

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
  ;