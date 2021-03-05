import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { getProducts } from "../actions/productAction";

const HomeScreen = ({ product: { products, loading, error }, getProducts }) => {
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.productList,
  };
};

export default connect(mapStateToProps, { getProducts })(HomeScreen);
