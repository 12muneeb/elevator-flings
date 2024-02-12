// // npm i @react-native-google-signin/google-signin react-native-fbsdk-next @invertase/react-native-apple-authentication
// // npm i @react-native-firebase/app @react-native-firebase/auth

// import Toast from 'react-native-toast-message';
// // import Auth from '@react-native-firebase/auth';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// // import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';

// GoogleSignin.configure({
//   webClientId:
//     '1058403653524-mtv61uquq0tc1bk9ndi3lrb2bhgpmtp8.apps.googleusercontent.com',
//   // '444368355777-gfl1010jd7uni379v7ggi4sncrrve4vt.apps.googleusercontent.com',
// });

// // Settings.setAppID('1101411500700897');

// const Google = async () => {
//   try {
//     const userInfo = await GoogleSignin.signIn();
//     const googleCredential = Auth.GoogleAuthProvider.credential(
//       userInfo.idToken,
//     );
//     const userAuth = await Auth().signInWithCredential(googleCredential);
//     const access_token = await (await userAuth.user.getIdToken()).toString();
//     const {uid, email} = userAuth?.user;
//     const socialUser = {
//       userData: userAuth?.user,
//       uid: userAuth?.user?.uid,
//       socialType: 'google',
//     };
//     await GoogleSignin.signOut();
//     return socialUser;
//   } catch (error) {
//     Toast.show({
//       text1: 'Unable sign in with Google',
//       type: 'error',
//       visibilityTime: 3000,
//     });
//   }
// };



// export default {Google, };
// npm i @react-native-google-signin/google-signin react-native-fbsdk-next @invertase/react-native-apple-authentication
// npm i @react-native-firebase/app @react-native-firebase/auth

import Toast from 'react-native-toast-message';
import Auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  loaderStopWithDispatch,
  loaderStartWithDispatch,
} from '../redux/actions/appAction';
import NavService from '../helpers/NavService';

GoogleSignin.configure({
  webClientId:
    // Android
    // '241029369585-kc45vunmlrvg7t7p0i9cd9cfk76e34p0.apps.googleusercontent.com',
  // IOS
   '444368355777-gfl1010jd7uni379v7ggi4sncrrve4vt.apps.googleusercontent.com',
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
    console.log('errorerrorerror',error)
    Toast.show({
      text1: 'Unable sign in with Google',
      type: 'error',
      visibilityTime: 3000,
    });
  }
};


export default {Google, Apple, Facebook, signInWithPhoneNumber};