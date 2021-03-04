import express from "express";
import Prouduct from "../models/productModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

// @desc    Fetch all Products
// @route   GET /api/products
// access   Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Prouduct.find({});
    res.json(products);
  })
);

// @desc    Fetch single Product
// @route   GET /api/products/:id
// access   Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Prouduct.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res
        .status(404)
        .json({ message: `Product with id:${req.params.id} not found` });
    }
  })
);

export default router;