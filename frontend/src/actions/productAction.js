import { GET_PRODUCTS, PRODUCTS_ERROR } from "./types";
import axios from "axios";

// get logs from server
export const listProducts = () => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispathc({
      type: PRODUCTS_ERROR,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
