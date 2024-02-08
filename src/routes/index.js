// @app
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
// Firebase Messaging
// import messaging from '@react-native-firebase/messaging';
// @navigations
import AppNavigation from './stacks/appNavigation';
import AuthNavigation from './stacks/authNavigation';
// Nav Service
import NavService from '../helpers/NavService';
// Custom Modal
// Custom Action for handling state in the popup
import { toggleVerificationPopUp } from '../redux/actions/authAction';

const OsVer = Platform.constants['Release'];

const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    await registerForNotifications();
  } else {
    // alert(' noti disabled’)
  }
};
const registerForNotifications = async () => {
  const isRegisted = messaging().isDeviceRegisteredForRemoteMessages;
  if (!isRegisted) {
    await messaging().registerDeviceForRemoteMessages(); // calls await messaging().registerDeviceForRemoteMessages()
  } else {
    // const fcmToken = await getFCMnotificationsToken();
    // fcmToken && (await updateBackendToken(fcmToken));
  }
};
const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Everso Business',
          message: 'Everso Business App access notification',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the notification');
        requestNotificationPermission();
      } else {
        console.log('notification permission denied');
        return;
      }
    } catch (error) {}
  } else {
    requestNotificationPermission();
  }
};
class MainNavigation extends Component {
  componentDidMount() {
    Orientation.lockToPortrait();
    checkApplicationPermission();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }
  render() {
    const loggedInUser = this.props?.user;
    const verificationPopUp = this.props?.verificationPopUp;
    return (
      <NavigationContainer ref={ref => NavService.setTopLevelNavigator(ref)}>
        <View style={styles.container}>
          {loggedInUser ? (
            <AppNavigation initialRoute={undefined} />
          ) : (
            <AuthNavigation initialRoute={undefined} />
          )}
       
        </View>
      </NavigationContainer>
    );
  }
}
const actions = {toggleVerificationPopUp};
function mapStateToProps({authReducer: {user, verificationPopUp}}) {
  return {
    user,
    verificationPopUp,
  };
}

export default connect(mapStateToProps, actions)(MainNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
