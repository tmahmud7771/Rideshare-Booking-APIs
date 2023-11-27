const express = require("express");

const router = express.Router();

const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controller/userControllers");
const { route } = require("./orderRoutes");

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/getprofile/:email").post(getUserProfile);

module.exports = router;
