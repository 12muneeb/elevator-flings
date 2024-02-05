// @app
import React, {Component} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
// Firebase Messaging
// import messaging from '@react-native-firebase/messaging';
// @navigations
import AuthNavigation from './stacks/authNavigation';
import AppNavigation from './stacks/appNavigation';
import {_AppLayout} from '../redux/actions';
// Nav Service
import NavService from '../helpers/NavService';
// Custom Modal
import ConfirmationModal from '../containers/Modal/ConfirmationModal';
// Custom Action for handling state in the popup
import {toggleVerificationPopUp} from '../redux/actions/authAction';

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
          {/* IF USER PROFILE STORE IS NOT EMPTY */}
          {loggedInUser ? (
            <AppNavigation initialRoute={undefined} />
          ) : (
            // <AppNavigation initialRoute={undefined} />
            <AuthNavigation initialRoute={undefined} />
          )}
          {/* IF USER PROFILE STORE IS EMPTY */}
          <ConfirmationModal
            isModalVisible={verificationPopUp}
            togglePopup={() => this.props.toggleVerificationPopUp()}
            Title={'Submitted'}
            SubTitle={'Pending verification by Everso'}
            verificationPopUp
          />
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
