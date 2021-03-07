import { CART_ADD_ITEM } from "../actions/types";

const initialState = {
  cartItem: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const exitItem = state.cartItem.find((x) => x.product === item.product);

      if (exitItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === exitItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }
    default:
      return state;
  }
};
