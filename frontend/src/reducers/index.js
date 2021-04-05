import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productListReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  userLogin: userReducer,
  orderCreate: orderReducer,
});

export default rootReducer;
