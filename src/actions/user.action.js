import api from "../services/baseService";
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "./actionType";

const token = localStorage.getItem("token");

export const userSignUp = (data) => {
  return (dispatch) => {
    return api
      .post("/sign_up", data)
      .then((response) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_ERROR,
          errMsg: err.response.data.message,
        });
      });
  };
};

export const userSignIn = (data) => {
  return (dispatch) => {
    return api
      .post("/sign_in", data)
      .then((response) => {
        if (response.data.data) {
          localStorage.setItem("token", response.data.data.user.auth_token);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          errMsg: err.response.data.message,
        });
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    return api
      .delete("/sign_out", { headers: { AUTH_TOKEN: token } })
      .then((response) => {
        localStorage.removeItem("token");
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_ERROR,
          errMsg: err.response.data.message,
        });
      });
  };
};
