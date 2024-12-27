const express = require("express");
const router = express.Router();

router.use("/headquarter", require("./headquarter.route"));


module.exports = router;
