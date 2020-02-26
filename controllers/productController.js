const Product = require("../models/productModel");
const AppError = require("../utils/appError");

const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} = require("./handlersFactory");

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = getAll(Product);
/*
exports.getAllProducts = (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: "We are working"
  });
};
*/

// @desc    Get product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getOneProduct = getOne(Product);

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Admin
exports.createOneProduct = createOne(Product);

// @desc    Update product by id
// @route   PATCH /api/v1/products/:id
// @access  Admin
exports.updateOneProduct = updateOne(Product);

// @desc    Delete product by id
// @route   DELETE /api/v1/products/:id
// @access  Admin
exports.deleteOneProduct = deleteOne(Product);
