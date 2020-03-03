const express = require("express");
const router = express.Router();

// user controller
const {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
  uploadProductPhoto,
  reizeProductPhoto,
  reizeProductPhotoUpdate
} = require("../controllers/productController");

// auth controller
const { protect, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(getAllProducts)
  .post(
    protect,
    restrictTo("admin", "owner"),
    uploadProductPhoto,
    reizeProductPhoto,
    createOneProduct
  );

router
  .route("/:id")
  .get(getOneProduct)
  .patch(
    protect,
    restrictTo("admin", "owner"),
    uploadProductPhoto,
    reizeProductPhotoUpdate,
    updateOneProduct
  )
  .delete(protect, restrictTo("admin", "owner"), deleteOneProduct);

module.exports = router;
