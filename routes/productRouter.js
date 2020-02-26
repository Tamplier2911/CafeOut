const express = require("express");
const router = express.Router();

// user controller
const {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct
} = require("../controllers/productController");

router
  .route("/")
  .get(getAllProducts)
  .post(createOneProduct);

router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateOneProduct)
  .delete(deleteOneProduct);

module.exports = router;
