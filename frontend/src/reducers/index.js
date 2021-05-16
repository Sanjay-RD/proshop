import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productListReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import orderdetailsReducer from "./orderdetailsReducer";
import orderPayReducer from "./orderPayReducer";
import myOrdersReducer from "./myOrdersReducer";
import userListReducer from "./userListReducer";
import userDeleteReducer from "./userDeleteReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  userLogin: userReducer,
  orderCreate: orderReducer,
  orderDetails: orderdetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

export default rootReducer;
