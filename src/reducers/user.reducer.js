import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from "../actions/actionType";

const init = {
  user: {},
  token: "",
  id: "",
  error: "",
  user_list: {},
};

export default (state = init, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: action.errMsg,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload.auth_token,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.errMsg,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        token: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.errMsg,
      };
    default:
      return state;
  }
};
