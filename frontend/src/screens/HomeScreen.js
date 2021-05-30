import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productAction";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);
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

export default HomeScreen;
