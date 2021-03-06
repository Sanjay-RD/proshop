import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  SET_LOADING,
  GET_PRODUCT,
} from "./types";
import axios from "axios";

// get logs from server
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
