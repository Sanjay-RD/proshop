import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
} from "./types";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 5000);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/user",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 5000);
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/user/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR });
    }, 5000);
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put("/api/user/profile", user, config);

    setTimeout(() => {
      dispatch({ type: CLEAR_MESSAGE });
    }, 5000);
    console.log(res);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    // setTimeout(() => {
    //   dispatch({ type: CLEAR_ERROR });
    // }, 5000);
  }
};
