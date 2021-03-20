import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userAction";

import { connect } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfileScreen = ({ history, location, getUserDetails, userLogin }) => {
  const { userInfo, loading, error, user } = userLogin;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        getUserDetails("profile");
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password Does not Match");
    } else {
      // DISPATCH UPDATE REDUCER
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Sign Up</h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmpassword">
            <Form.Label>confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirmPassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            register
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>Order Listing</h1>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

export default connect(mapStateToProps, { getUserDetails })(ProfileScreen);
