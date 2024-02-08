import _ from 'lodash';
import ApiSauce from '../services/ApiSauce';
import store from '../redux';

// export const BASE_URL = 'https://server.appsstaging.com:3017/api/v1/';
export const BASE_URL =
  'https://server1.appsstaging.com/3230/elevator/public/api/';
export const ASSETS_URL =
  'https://server1.appsstaging.com/3230/elevator/public/';
export const WEB_SOCKET_URL = 'https://server1.appsstaging.com:3095';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=';
// export const BASE_URL = "http://10.0.4.71:3018/api/v1/"; //local
// export const ASSETS_URL = "http://10.0.4.71:3018/"; //local
export const API_TIMEOUT = 20000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';
export const GEOCODE_API_KEY = 'AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};
export const ERROR_CANCEL_ERROR = {
  message: 'Upload cancelled',
  error: 'Upload cancelled',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const LOGIN = {
  route: 'auth/login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SIGNUP = {
  route: 'auth/register',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const VERIFY_OTP = {
  route: 'auth/verification',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_PASSWORD = {
  route: 'update-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const RESEND_OTP = {
  route: 'resendCode',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const FORGOT_PASSWORD = {
  route: 'auth/forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const SOCIAL_SIGN_IN = {
  route: 'auth/social-login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const LOGOUT = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const COMPLETE_PROFILE = {
  route: 'complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_PROFILE = {
  route: 'complete-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_PASSWORD = {
  route: 'updatePassword',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_USER = {
  route: 'delete-account',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const CREATE_PROPERTY = {
  route: 'property/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_ALL_PROPERTY = {
  route: 'property/list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PROPERTY_DETAIL = {
  route: 'property/detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const EVENT_DETAIL = {
  route: 'event/detail',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};


export const callRequest = function (
  url,
  data,
  parameter,
  moreUrlParameter,
  urlParameter,
  header = {},
  // ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token =
      store?.getState()?.authReducer?.userToken !== null
        ? store?.getState()?.authReducer?.userToken
        : '';
    console.log('_access_token', _access_token);
    // const _access_token = '';
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: _access_token.includes('Bearer ')
            ? _access_token
            : 'Bearer ' + _access_token,
        },
      };
    }
  }

  const _url =
    parameter &&
    !_.isEmpty(parameter) &&
    urlParameter &&
    !_.isEmpty(urlParameter)
      ? `${url.route}/${urlParameter}?${parameter?.key}=${parameter?.value}`
      : parameter && !_.isEmpty(parameter)
      ? `${url.route}?${parameter?.key}=${parameter?.value}`
      : moreUrlParameter && !_.isEmpty(moreUrlParameter)
      ? `${url.route}?${moreUrlParameter?.firstKey}=${moreUrlParameter?.firstValue}&${moreUrlParameter?.secondKey}=${moreUrlParameter?.secondValue}`
      : urlParameter && !_.isEmpty(urlParameter)
      ? `${url.route}/${urlParameter}`
      : url.route;
  console.log('_url', url);
  console.log('_url', _url);
  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

export default {
  SOCIAL_SIGN_IN,
  LOGIN,
  COMPLETE_PROFILE,
  UPDATE_PROFILE,
  LOGOUT,
  CHANGE_PASSWORD,
  DELETE_USER,
  SIGNUP,
  RESEND_OTP,
  VERIFY_OTP,
  FORGOT_PASSWORD,
};
