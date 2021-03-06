import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  SET_LOADING,
  GET_PRODUCT,
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
