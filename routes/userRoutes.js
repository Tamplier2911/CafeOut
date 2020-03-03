const express = require("express");
const router = express.Router();

// user controller
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe,
  deleteMe
} = require("../controllers/userController");

const {
  protect,
  signup,
  restrictTo,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  getUserObject,
  isEmailUnique
} = require("../controllers/authController");

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// logout
router.get("/logout", logout);

// forgot password
router.post("/forgotPassword", forgotPassword);

// reset password
router.patch("/resetPassword/:token", resetPassword);

// PROTECTED
router.use(protect);

// update password
router.patch("/updateMyPassword", updatePassword);

// get
router.get("/getUserObject", getUserObject);

// update currently logged user data
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);

// delete currently logged user
router.delete("/deleteMe", deleteMe);

// RESTRICTED
router.use(restrictTo("admin", "owner"));

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser);

router
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
