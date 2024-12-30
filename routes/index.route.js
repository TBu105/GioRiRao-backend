const express = require("express");
const router = express.Router();

router.use("/city", require("./city.route"));


module.exports = router;
