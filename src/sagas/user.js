import { take, put, call, fork } from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {
  loginUser,
  saveTokenForLoginUser,
  saveUserForLoginUser,
  logoutUser,
  toggleVerificationPopUp,
} from '../redux/actions/authAction';
import { loaderStart, loaderStop } from '../redux/actions/appAction';
import API_URL, {
  LOGIN,
  SOCIAL_SIGN_IN,
  callRequest,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  SIGNUP,
  VERIFY_OTP,
  RESEND_PASSWORD,
  FORGOT_PASSWORD,
  RESEND_OTP,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';
import NavService from '../helpers/NavService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function* login() {
  while (true) {
    const { payload } = yield take(ActionTypes.LOGIN_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGIN,
        payload,
        // '',
        // '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      console.log('dfdfdf', response)
      if (response.status === 1) {
        if (response?.data?.is_verified == 0) {
          console.log('00000', response)
          NavService.navigate('Otp', {
            user_id: response?.data?.id,
            screenName: 'signup',
          });
          Util.DialogAlert(response.message, 'success');
        } else if (response?.data?.is_account_verified == 0) {
          console.log('099', response)
          NavService.navigate('PreLogin', {
            screen: 'Otp',
          });
          yield put(toggleVerificationPopUp(true));
        } else {
          console.log('login response', response);
          yield put(saveTokenForLoginUser(response?.bearer_token));
          yield put(loginUser(response?.data));
          Util.DialogAlert(response.message, 'success');
        }
        console.log('response', response);
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* signUp() {

  console.log('sign starttttttttttttttttttttttttttttttttttt');
  while (true) {

    const { payload } = yield take(ActionTypes.SIGNUP_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SIGNUP,
        payload,
        // '',
        // '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        Util.DialogAlert(response.message, 'success');
        console.log('responfffse', response);
        NavService.navigate('Otp', {
          screenName: 'signup',
          id: response.data?.user_id,
        });
        // NavService.navigate('SetupAddress', {
        //   user: response.data,
        // });
      } else {
        console.log('response else', response.message);
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* oTPVerify() {
  while (true) {
    const { payload, screen } = yield take(ActionTypes.VERIFY_OTP.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        VERIFY_OTP,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        yield put(saveTokenForLoginUser(response?.bearer_token));
        if (screen == 'signup') {
          NavService.navigate('CompleteProfile', {
            screen: 'Otp',
          });
          yield put(toggleVerificationPopUp(true));

        } else {
          if (screen == 'forgot') {
            NavService.navigate('ResetPassword', {
              user_id: response.data,
            });
          } else {
            NavService.navigate('CompleteProfile', {
              user_id: response.data,
            });
          }

        }
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* resendOTP() {
  while (true) {
    const { payload } = yield take(ActionTypes.RESEND_OTP.REQUEST);
    console.log('payload', payload);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_OTP,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        // yield put(loginUser(response.data));
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* resetPassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.RESEND_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_PASSWORD,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payload', response);
        NavService.navigate('Login');
        Util.DialogAlert('Passwrod Changed Successfully', 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* forgotPassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.FORGOT_PASSWORD.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('forgot', response);
        NavService.navigate('Otp', {
          screenName: 'forgot',
          id: response.data?.user_id,
        });
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

function* socialSignin() {
  while (true) {
    const { payload } = yield take(ActionTypes.SOCIAL_SIGNUP_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        SOCIAL_SIGN_IN,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('response.data', response.data, 'response.data');
        if (response?.data?.is_profile_complete == 0) {
          yield put(saveTokenForLoginUser(response?.bearer_token));
          NavService.navigate('Descriptions');
        } else if (response?.data?.is_account_verified == 0) {
          yield put(toggleVerificationPopUp(true));
        } else {
          yield put(loginUser(response.data));
          yield put(saveTokenForLoginUser(response?.bearer_token));
        }

        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* changePassword() {
  while (true) {
    const { payload } = yield take(ActionTypes.CHANGE_PASSWORD.REQUEST);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        RESEND_PASSWORD,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payload', response);
        NavService.navigate('Login');
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteUser() {
  while (true) {
    const { payload } = yield take(ActionTypes.DELETE_USER.REQUEST);

    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_USER,
        null,
        '',
        '',
        payload,
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payload', response);
        GoogleSignin.signOut();
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* completeProfile() {
  while (true) {
    const { payload } = yield take(ActionTypes.COMPLETE_PROFILE.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        COMPLETE_PROFILE,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        if (response?.data?.is_account_verified == 0) {
          NavService.navigate('PreLogin', {
            screen: 'CompleteProfile',
          });
          yield put(toggleVerificationPopUp(true));
        } else {
          yield put(loginUser(response.data));
          yield put(saveTokenForLoginUser(response?.bearer_token));
        }
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateProfile() {
  while (true) {
    const { payload, goBack, param } = yield take(ActionTypes.UPDATE_PROFILE.REQUEST);
    console.log('UPDATE_PROFILE', param?.type)
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        console.log('payload', response);
        yield put(loginUser(response.data));
        if (goBack) {
          NavService.goBack();
        }
        if (param?.type == 'notification') {
          if (param?.on == 0) {
            Util.DialogAlert('Notification is turned OFF', 'success');
          }
          else {
            Util.DialogAlert('Notification is turned ON', 'success');
          }
        }
        else {
          Util.DialogAlert(response.message, 'success');
        }

      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteUserAccount() {
  while (true) {
    const { params } = yield take(ActionTypes.DELETE_USER.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        DELETE_USER,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* userLogout() {
  while (true) {
    const { payload } = yield take(ActionTypes.USER_LOGOUT.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        LOGOUT,
        null,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        yield put(logoutUser());
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}

export default function* root() {
  yield fork(login);
  // yield fork(socialSignin);
  yield fork(completeProfile);
  // yield fork(updateProfile);
  // yield fork(deleteUserAccount);
  // yield fork(userLogout);
  // yield fork(changePassword);
  // yield fork(deleteUser);
  yield fork(signUp);
  yield fork(oTPVerify);
  yield fork(forgotPassword);
  // yield fork(resendOTP);
  yield fork(resetPassword);
}
