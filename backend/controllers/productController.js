import Prouduct from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all Products
// @route   GET /api/products
// access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Prouduct.find({});
  // throw new Error("some error");
  res.json(products);
});

// @desc    Fetch single Product
// @route   GET /api/products/:id
// access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Prouduct.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res
      .status(404)
      .json({ message: `Product with id:${req.params.id} not found` });
  }
});

export { getProducts, getProductById };
