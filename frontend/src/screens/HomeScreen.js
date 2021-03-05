import React, { useState, useEffect } from "react";
import Product from "../components/Product";

import { Row, Col } from "react-bootstrap";
import axios from "axios";

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
        <h2>Loading .....</h2>
      ) : error ? (
        <h3>{error}</h3>
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
