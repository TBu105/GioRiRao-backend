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
  uploadDisk.single("avatar"),
  authController.signUpAdmin
);

router.post(
  "/staff/signup",
  verifyAccessToken,
  authorize(["admin"]),
  uploadDisk.single("avatar"),
  authController.signUpStaff
);

router.post(
  "/manager/signup",
  verifyAccessToken,
  authorize(["admin"]),
  uploadDisk.single("avatar"),
  authController.signUpStaff
);

router.post("/login", authController.loginStaff);
router.get("/me", verifyAccessToken, authController.getMeInfo);
router.get("/verify", verifyAccessToken, authController.isUserLogin);
router.post("/logout", verifyAccessToken, authController.logOut);

module.exports = router;
