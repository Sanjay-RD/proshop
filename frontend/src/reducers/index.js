import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productListReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
});

export default rootReducer;
