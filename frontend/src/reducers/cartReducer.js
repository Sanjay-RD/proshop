import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/types";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// console.log(cartItemsFromStorage);

const initialState = {
  cartItem: cartItemsFromStorage,
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
