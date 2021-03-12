import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Auth User and Get Token
// @route   POST /api/user/login
// access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    Register a new User
// @route   POST /api/user
// access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExit = await User.findOne({ email });

  if (userExit) {
    res.status(400);
    throw new Error("User with this email already Exit");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    res.status(201);
    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Get User Profile
// @route   GET /api/user/profile
// access   Private
// note:- to use authorization token in postman, in headers put Authorization in key value and value as 'Bearer tokenvalue' and only you will be authorized.
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export { authUser, getUserProfile, registerUser };
