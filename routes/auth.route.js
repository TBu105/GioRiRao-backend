const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware");
// const { signUpSchema } = require("../validations/staff.validation");
const { uploadDisk } = require("../config/multer.config");
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const authorize = require("../middlewares/authorize.middleware");

router.post(
  "/admin/signup",
  verifyAccessToken,
  authorize(["admin"]),
  //   validate(signUpSchema),
  uploadDisk.single("avatar"),
  authController.signUpAdmin
);

router.post(
  "/staff/signup",
  verifyAccessToken,
  authorize(["storeManager"]),
  //   validate(signUpSchema),
  uploadDisk.single("avatar"),
  authController.signUpStaff
);

router.post(
  "/admin/login",
  //   validate(signUpSchema),
  authController.loginStaff
);

module.exports = router;
