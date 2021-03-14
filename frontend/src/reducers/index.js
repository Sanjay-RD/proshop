import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productListReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  userLogin: userReducer,
});

export default rootReducer;
