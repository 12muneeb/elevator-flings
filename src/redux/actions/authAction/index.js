import ActionTypes, {
  USERLOGINDATA,
  USERLOGOUT,
  USERLOGINTOKEN,
  CURRENTLOGINUSERINFO,
  SIGNUP_USER,
  VERIFY_POPUP,
} from '../../constants';
import store from '../../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loginUser(payload) {
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function saveTokenForLoginUser(payload) {
  return {
    type: USERLOGINTOKEN,
    payload,
  };
}
export function toggleVerificationPopUp(payload) {
  return {
    type: VERIFY_POPUP,
    payload,
  };
}
export function signUpUser(payload) {
  return {
    type: ActionTypes.SIGNUP_USER.REQUEST,
    payload,
  };
}
export function resendOTP(payload) {
  return {
    type: ActionTypes.RESEND_OTP.REQUEST,
    payload,
  };
}
export function otpVerify(payload, screen) {
  return {
    type: ActionTypes.VERIFY_OTP.REQUEST,
    payload,
    screen,
  };
}
export function forgotPassword(payload) {
  return {
    type: ActionTypes.FORGOT_PASSWORD.REQUEST,
    payload,
  };
}
export function resendPassword(payload) {
  return {
    type: ActionTypes.RESEND_PASSWORD.REQUEST,
    payload,
  };
}
export function saveUserForLoginUser(payload) {
  return {
    type: CURRENTLOGINUSERINFO,
    payload,
  };
}
export function loginCurrentUser(payload) {
  return {
    type: ActionTypes.LOGIN_USER.REQUEST,
    payload,
  };
}
export function socialSignin(payload) {
  return {
    type: ActionTypes.SOCIAL_SIGNUP_USER.REQUEST,
    payload,
  };
}
export function completeProfile(payload) {
  return {
    type: ActionTypes.COMPLETE_PROFILE.REQUEST,
    payload,
  };
}
export function updateProfile(payload, goBack,param) {
  return {
    type: ActionTypes.UPDATE_PROFILE.REQUEST,
    payload,
    goBack,
    param
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}
export function logoutUserWithDispatch() {
  dispatch({type: USERLOGOUT});
}

export function logoutCurrentUser() {
  return {
    type: ActionTypes.USER_LOGOUT.REQUEST,
  };
}
export function deleteCurrentUser(params) {
  return {
    type: ActionTypes.DELETE_USER.REQUEST,
    params,
  };
}

export function changePassword(payload) {
  return {
    type: ActionTypes.CHANGE_PASSWORD.REQUEST,
    payload,
  };
}

export function deleteUser(payload) {
  return {
    type: ActionTypes.DELETE_USER.REQUEST,
    payload,
  };
}
