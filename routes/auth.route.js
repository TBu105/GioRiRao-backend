const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware");
const {
  registerStaffSchema,
  registerAdminSchema,
  loginSchema,
} = require("../validations/auth.validation");
const { uploadDisk } = require("../config/multer.config");
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const authorize = require("../middlewares/authorize.middleware");

router.post(
  "/admin/signup",
  verifyAccessToken,
  authorize(["admin"]),
  validate(registerAdminSchema),
  uploadDisk.single("avatar"),
  authController.signUpAdmin
);

router.post(
  "/staff/signup",
  verifyAccessToken,
  authorize(["storeManager"]),
  validate(registerStaffSchema),
  uploadDisk.single("avatar"),
  authController.signUpStaff
);

router.post("/admin/login", validate(loginSchema), authController.loginStaff);

module.exports = router;
