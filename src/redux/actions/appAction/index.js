// import messaging from '@react-native-firebase/messaging';
import store from '../../index';
import ActionTypes from '../../constants';
function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  return {
    type: 'LOADER_START',
  };
}
export function loaderStartWithDispatch() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStopWithDispatch() {
  dispatch({type: 'LOADER_STOP'});
}
export function loaderStop() {
  return {
    type: 'LOADER_STOP',
  };
}
export function saveScoket(socket) {
  dispatch({type: 'SAVE_SOCKET', payload: socket});
}
export const getDeviceToken = async () => {
  try {
    // await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    if (token) return token;
    else return '';
  } catch (error) {
    console.log(error);
  }
};

export function getListCategory(responseCallback) {
  return {
    type: ActionTypes.GET_LIST_CATRGORY.REQUEST,
    responseCallback,
  };
}
export function getBlockedUsers(responseCallback) {
  return {
    type: ActionTypes.GET_BLOCKED_USERS.REQUEST,
    responseCallback,
  };
}
export function toggleBlockListUser(payload, responseCallback) {
  return {
    type: ActionTypes.TOGGLE_BLOCKIST_HANDLER.REQUEST,
    payload,
    responseCallback,
  };
}
export function removeUserFromEvent(payload, responseCallback) {
  return {
    type: ActionTypes.REMOVE_EVENT_COMING_USER.REQUEST,
    payload,
    responseCallback,
  };
}
export function getStates(responseCallback) {
  return {
    type: ActionTypes.GET_ALL_STATES.REQUEST,
    responseCallback,
  };
}

export function addProperties(payload) {
  return {
    type: ActionTypes.ADD_PROPERTIES.REQUEST,
    payload,
  };
}
export function getProperties(params, loaderShown, responseCallback) {
  return {
    type: ActionTypes.GET_PROPERTIES.REQUEST,
    params,
    loaderShown,
    responseCallback,
  };
}
export function getNotificationList(params, loaderShown, responseCallback) {
  return {
    type: ActionTypes.GET_NOTIFICATIONS.REQUEST,
    params,
    loaderShown,
    responseCallback,
  };
}
export function getPropertyDetail(params, responseCallback) {
  return {
    type: ActionTypes.GET_PROPERTY_DETAIL.REQUEST,
    params,
    responseCallback,
  };
}
export function deleteCurrentProperty(params) {
  return {
    type: ActionTypes.DELETE_PROPERTY.REQUEST,
    params,
  };
}
export function deleteCurrentEvent(params) {
  return {
    type: ActionTypes.DELETE_EVENT.REQUEST,
    params,
  };
}
export function updateProperties(payload) {
  return {
    type: ActionTypes.UPDATE_PROPERTIES.REQUEST,
    payload,
  };
}
export function getAllEvents(params, loaderShown, responseCallback) {
  return {
    type: ActionTypes.GET_ALL_EVENTS.REQUEST,
    params,
    loaderShown,
    responseCallback,
  };
}
export function getSearchInfoForAll(params, responseCallback) {
  return {
    type: ActionTypes.GET_SEARCH_QUERY_INFO.REQUEST,
    params,
    responseCallback,
  };
}
export function getEventDetail(params, responseCallback) {
  return {
    type: ActionTypes.EVENT_DETAIL.REQUEST,
    params,
    responseCallback,
  };
}
export function handelEventRequest(payload, responseCallback) {
  return {
    type: ActionTypes.EVENT_REQUEST.REQUEST,
    payload,
    responseCallback,
  };
}
export function addEvent(payload) {
  return {
    type: ActionTypes.ADD_EVENT.REQUEST,
    payload,
  };
}
export function updateEvent(payload) {
  return {
    type: ActionTypes.UPDATE_EVENT.REQUEST,
    payload,
  };
}
export function getChatList(responseCallback) {
  return {
    type: ActionTypes.GET_CHAT_LIST.REQUEST,
    responseCallback,
  };
}
export function fetchUsersOfEvent(params, responseCallback) {
  return {
    type: ActionTypes.GET_EVENT_COMING_USER.REQUEST,
    params,
    responseCallback,
  };
}
export function togglePropertyAddModal(toggleModal) {
  dispatch({
    type: 'TOGGLE_ADD_PROPERTY_MODAL',
    payload: toggleModal,
  });
}
