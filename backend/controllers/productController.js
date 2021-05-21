import Prouduct from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

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

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// access   Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Prouduct.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res
      .status(404)
      .json({ message: `Product with id:${req.params.id} not found` });
  }
});

// @desc    Create a Product
// @route   POST /api/products
// access   Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a Product
// @route   Put /api/products/:id
// access   Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, countInStock, image, brand, category } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.image = image;
    product.price = price;
    product.countInStock = countInStock;
    product.brand = brand;
    product.category = category;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
