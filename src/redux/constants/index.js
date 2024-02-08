export const USERLOGINTOKEN = 'USERLOGINTOKEN';
export const USERLOGINDATA = 'USERLOGINDATA';
export const USERLOGOUT = 'USERLOGOUT';
export const CURRENTLOGINUSERINFO = 'CURRENTLOGINUSERINFO';
export const ISUSERLOGIN = 'ISUSERLOGIN';
export const LOADER = 'LOADER';
export const CURRENTUSERPROFILE = 'CURRENTUSERPROFILE';
export const ERRMSG = 'ERRMSG';
export const SEARCHEDREST = 'SEARCHEDREST';
export const VERIFY_POPUP = 'VERIFY_POPUP';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {
    REQUEST: undefined,
    SUCCESS: undefined,
    CANCEL: undefined,
    FAILURE: undefined,
  };
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const SHOW_LOADING = 'SHOW_LOADING';
export const LOADING_STATE = 'APP_INFO_SHOW_LOADING';
export const PRIVACY_POLICY = 'PRIVACY_POLICY';
export const CLEAR_USER_TEMP_DATA = 'CLEAR_USER_TEMP_DATA';
export const APP_USAGE_POLICIES = createRequestTypes('APP_USAGE_POLICIES');

// USER ACTIONS
export const SOCIAL_SIGNUP_USER = createRequestTypes('SOCIAL_SIGNUP_USER');
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
export const COMPLETE_PROFILE = createRequestTypes('COMPLETE_PROFILE');
export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const SIGNUP_USER = createRequestTypes('SIGNUP_USER');
export const VERIFY_OTP = createRequestTypes('VERIFY_OTP');
export const RESEND_OTP = createRequestTypes('RESEND_OTP');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const RESEND_PASSWORD = createRequestTypes('RESEND_PASSWORD');
export const GET_BLOCKED_USERS = createRequestTypes('GET_BLOCKED_USERS');
export const TOGGLE_BLOCKIST_HANDLER = createRequestTypes(
  'TOGGLE_BLOCKIST_HANDLER',
);
export const REMOVE_EVENT_COMING_USER = createRequestTypes(
  'REMOVE_EVENT_COMING_USER',
);
// App Action
export default {
  LOADING_STATE,
  SOCIAL_SIGNUP_USER,
  LOGIN_USER,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  USER_LOGOUT,
  CHANGE_PASSWORD,
  SIGNUP_USER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESEND_PASSWORD,
};
