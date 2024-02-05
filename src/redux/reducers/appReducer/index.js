import {LOADER, ERRMSG, SEARCHEDREST} from '../../constants';

const INITIAL_STATE = {
  loader: false,
  errMsg: '',
  searchedRest: [],
  addModal: false,
  socket: null,
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADER_START':
      return {
        ...states,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...states,
        loader: false,
      };
    case 'SAVE_SOCKET':
      return {
        ...states,
        socket: action.payload,
      };
    case 'TOGGLE_ADD_PROPERTY_MODAL':
      return {
        ...states,
        addModal: action?.payload,
      };
    case ERRMSG:
      return {
        ...states,
        errMsg: action.payload,
      };
    case SEARCHEDREST:
      return {
        ...states,
        searchedRest: action.payload,
      };

    default:
      return states;
  }
};
