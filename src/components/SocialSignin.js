// npm i @react-native-google-signin/google-signin react-native-fbsdk-next @invertase/react-native-apple-authentication
// npm i @react-native-firebase/app @react-native-firebase/auth

import Toast from 'react-native-toast-message';
// import Auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {socialSignin} from '../redux/APIs';

GoogleSignin.configure({
  webClientId:
    '1058403653524-mtv61uquq0tc1bk9ndi3lrb2bhgpmtp8.apps.googleusercontent.com',
  // '444368355777-gfl1010jd7uni379v7ggi4sncrrve4vt.apps.googleusercontent.com',
});

// Settings.setAppID('1101411500700897');

const Google = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = Auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userAuth = await Auth().signInWithCredential(googleCredential);
    // const access_token = await (await userAuth.user.getIdToken()).toString();
    // const {uid, email} = userAuth?.user;
    const socialUser = {
      userData: userAuth?.user,
      uid: userAuth?.user?.uid,
      socialType: 'google',
    };
    await GoogleSignin.signOut();
    return socialUser;
  } catch (error) {
    Toast.show({
      text1: 'Unable sign in with Google',
      type: 'error',
      visibilityTime: 3000,
    });
  }
};

const Facebook = () => {
  // LoginManager.logInWithPermissions(['public_profile'])
  //   .then(async login => {
  //     if (login.isCancelled) {
  //     } else {
  //       try {
  //         const fbAuth = await AccessToken.getCurrentAccessToken();
  //         const fbCredential = Auth.FacebookAuthProvider.credential(
  //           fbAuth.accessToken,
  //         );
  //         const userAuth = await Auth().signInWithCredential(fbCredential);
  //         await socialSignin(userAuth, 'facebook');
  //       } catch (error) {
  //         console.log(error);
  //         Toast.show({
  //           text1: 'Unable to sign in with Facebook',
  //           type: 'error',
  //           visibilityTime: 3000,
  //         });
  //       }
  //     }
  //   })
  //   .catch(error => console.log(error));
};

const Apple = async () => {
  // performs login request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = Auth?.AppleAuthProvider?.credential(
      identityToken,
      nonce,
    );
    const userAuth = await Auth()?.signInWithCredential(appleCredential);
    const {uid} = userAuth?.user;
    const user_credential = userAuth?.user?._user?.providerData;
    const socialUser = {
      userData: user_credential,
      uid: uid,
      socialType: 'apple',
    };
    return socialUser;
  } catch (error) {
    console.log(error);
    Toast.show({
      text1: 'Unable to sign in with Apple',
      type: 'error',
      visibilityTime: 3000,
    });
  }
};

export default {Google, Apple, Facebook};
