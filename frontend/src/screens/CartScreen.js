import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartAction";

const CartScreen = ({ match, location, history, addToCart, cart }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    addToCart(productId, qty);
  }, []);

  return <div>Cart</div>;
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartItem,
  };
};

export default connect(mapStateToProps, { addToCart })(CartScreen);
