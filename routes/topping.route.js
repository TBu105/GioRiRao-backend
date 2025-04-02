const express = require("express");
const router = express.Router();
const toppingController = require("../controllers/topping.controller");
const validate = require("../middlewares/validation.middleware");
const { uploadDisk } = require("../config/multer.config");
const verifyAccessToken = require("../middlewares/verify.access.token.middleware");
const authorize = require("../middlewares/authorize.middleware");

router.post(
  "/",
  //   verifyAccessToken,
  //   authorize(["admin"]),
  uploadDisk.single("thumbnail"),
  toppingController.createTopping
);

router.get(
  "/",
  //   verifyAccessToken,
  //   authorize(["admin"]),
  toppingController.getAllToppings
);
router.put("/:id", toppingController.updateTopping);
router.put("/delete/:id", toppingController.deleteTopping);

module.exports = router;
