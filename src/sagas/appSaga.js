import {take, put, call, fork} from 'redux-saga/effects';
import ActionTypes from '../redux/constants';
import {loginUser, toggleVerificationPopUp} from '../redux/actions/authAction';
import {loaderStart, loaderStop} from '../redux/actions/appAction';
import API_URL, {
  callRequest,
  FETCH_NOTIFICATION,
  CREATE_PROPERTY,
  GET_ALL_PROPERTY,
  GET_PROPERTY_DETAIL,
  DELETE_PROPERTY,
  DELETE_EVENT,
  PROPERTY_UPDATE,
  GET_ALL_EVENTS,
  EVENT_REQUEST,
  GET_LIST_CATRGORY,
  ADD_EVENT,
  UPDATE_CURRENT_EVENT,
  EVENT_DETAIL,
  FETCH_CHAT_LIST,
  GET_SEARCH_INFO,
  FETCH_EVENT_COMING_USER_LIST,
  GET_BLOCKED_USERS,
  HANDLE_BLOCKED_USER,
  REMOVE_USER_FROM_EVENT,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../utils/Utils';
import NavService from '../helpers/NavService';

function* createProperty() {
  while (true) {
    const {payload} = yield take(ActionTypes.ADD_PROPERTIES.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        CREATE_PROPERTY,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getAllNotification() {
  while (true) {
    const {params, loaderShown, responseCallback} = yield take(
      ActionTypes.GET_NOTIFICATIONS.REQUEST,
    );
    if (loaderShown) {
      yield put(loaderStart());
    }
    try {
      const response = yield call(
        callRequest,
        FETCH_NOTIFICATION,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      responseCallback([]);
      // Util.DialogAlert(error.message);
    } finally {
      if (loaderShown) {
        yield put(loaderStop());
      }
    }
  }
}
function* getAllProperty() {
  while (true) {
    const {params, loaderShown, responseCallback} = yield take(
      ActionTypes.GET_PROPERTIES.REQUEST,
    );
    if (loaderShown) {
      yield put(loaderStart());
    }
    try {
      const response = yield call(
        callRequest,
        GET_ALL_PROPERTY,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      responseCallback([]);
      // Util.DialogAlert(error.message);
    } finally {
      if (loaderShown) {
        yield put(loaderStop());
      }
    }
  }
}
function* getPropertyDetails() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_PROPERTY_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        GET_PROPERTY_DETAIL,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteProperty() {
  while (true) {
    const {params} = yield take(ActionTypes.DELETE_PROPERTY.REQUEST);
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        DELETE_PROPERTY,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        responseCallback([]);
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* deleteEvent() {
  while (true) {
    const {params} = yield take(ActionTypes.DELETE_EVENT.REQUEST);
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        DELETE_EVENT,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        responseCallback([]);
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateProperty() {
  while (true) {
    const {payload} = yield take(ActionTypes.UPDATE_PROPERTIES.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        PROPERTY_UPDATE,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getSearchInfoForAll() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_SEARCH_QUERY_INFO.REQUEST,
    );
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        GET_SEARCH_INFO,
        null,
        params,
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        console.log('response----response', response);
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error=====errrr', error);
      yield put(loaderStop());
      // Util.DialogAlert(error.message);
    }
  }
}
function* getChatList() {
  while (true) {
    const {responseCallback} = yield take(ActionTypes.GET_CHAT_LIST.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FETCH_CHAT_LIST,
        null,
        '',
        '',
        '',
        {},
        ApiSauce,
      );
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      responseCallback([]);
      // Util.DialogAlert(error.message);
    } finally {
      yield put(loaderStop());
    }
  }
}
function* getEventComingUser() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_EVENT_COMING_USER.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        FETCH_EVENT_COMING_USER_LIST,
        null,
        params,
        '',
        '',
        {},
        ApiSauce,
      );
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      responseCallback([]);
      // Util.DialogAlert(error.message);
    } finally {
      yield put(loaderStop());
    }
  }
}
function* getAllEvents() {
  while (true) {
    const {params, loaderShown, responseCallback} = yield take(
      ActionTypes.GET_ALL_EVENTS.REQUEST,
    );
    if (loaderShown) {
      yield put(loaderStart());
    }
    try {
      const response = yield call(
        callRequest,
        GET_ALL_EVENTS,
        null,
        '',
        params ? params : '',
        '',
        {},
        ApiSauce,
      );
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      responseCallback([]);
      // Util.DialogAlert(error.message);
    } finally {
      if (loaderShown) {
        yield put(loaderStop());
      }
    }
  }
}
function* handleEventRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.EVENT_REQUEST.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        EVENT_REQUEST,
        payload,
        '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        Util.DialogAlert(response.message, 'success');
        if (responseCallback) {
          responseCallback(response);
        }
      } else {
        responseCallback({status: 0});
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
      responseCallback({status: 0});
    }
  }
}
function* getDetail() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.EVENT_DETAIL.REQUEST,
    );
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        EVENT_DETAIL,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* addEvent() {
  while (true) {
    const {payload} = yield take(ActionTypes.ADD_EVENT.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        ADD_EVENT,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* updateEvent() {
  while (true) {
    const {payload} = yield take(ActionTypes.UPDATE_EVENT.REQUEST);
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        UPDATE_CURRENT_EVENT,
        payload,
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response.status === 1) {
        NavService.goBack();
        Util.DialogAlert(response.message, 'success');
      } else {
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getListCategory() {
  while (true) {
    const {params, responseCallback} = yield take(
      ActionTypes.GET_LIST_CATRGORY.REQUEST,
    );
    yield put(loaderStart());
    try {
      console.log('params', params);
      const response = yield call(
        callRequest,
        GET_LIST_CATRGORY,
        null,
        params ? params : '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* getBlockedUsers() {
  while (true) {
    const {responseCallback} = yield take(
      ActionTypes.GET_BLOCKED_USERS.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        GET_BLOCKED_USERS,
        null,
        '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        if (responseCallback) {
          responseCallback(response?.data);
        }
      } else {
        responseCallback([]);
        // Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      // Util.DialogAlert(error.message);
    }
  }
}
function* handleBlocklistUser() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.TOGGLE_BLOCKIST_HANDLER.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        HANDLE_BLOCKED_USER,
        payload,
        '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        Util.DialogAlert(response.message, 'success');
        if (responseCallback) {
          responseCallback(response);
        }
      } else {
        responseCallback({status: 0});
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
function* removeEventComingUser() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ActionTypes.REMOVE_EVENT_COMING_USER.REQUEST,
    );
    yield put(loaderStart());
    try {
      const response = yield call(
        callRequest,
        REMOVE_USER_FROM_EVENT,
        payload,
        '',
        '',
        '',
        {},
        ApiSauce,
      );
      yield put(loaderStop());
      if (response?.status === 1) {
        Util.DialogAlert('User removed successfully', 'success');
        if (responseCallback) {
          responseCallback(response);
        }
      } else {
        responseCallback({status: 0});
        Util.DialogAlert(response.message, 'error');
      }
    } catch (error) {
      console.log('error', error);
      yield put(loaderStop());
      Util.DialogAlert(error.message);
    }
  }
}
export default function* root() {
  yield fork(createProperty);
  yield fork(getAllNotification);
  yield fork(updateProperty);
  yield fork(getSearchInfoForAll);
  yield fork(getAllProperty);
  yield fork(getPropertyDetails);
  yield fork(deleteProperty);
  yield fork(deleteEvent);
  yield fork(getChatList);
  yield fork(getEventComingUser);
  yield fork(getAllEvents);
  yield fork(addEvent);
  yield fork(updateEvent);
  yield fork(getListCategory);
  yield fork(getDetail);
  yield fork(handleEventRequest);
  yield fork(getBlockedUsers);
  yield fork(handleBlocklistUser);
  yield fork(removeEventComingUser);
}
