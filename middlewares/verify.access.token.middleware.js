const jwt = require("jsonwebtoken");
const HttpStatusCodes = require("../config/http.status.config");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED.code)
      .json({ message: "Access token is required" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access token not found" });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    console.log("req.user", req.user);

    next();
  } catch (err) {
    // err
    if (err.name === "TokenExpiredError") {
      return res
        .status(HttpStatusCodes.FORBIDDEN.code)
        .json({ message: "Access token expired" });
    } else if (err) {
      return res
        .status(HttpStatusCodes.FORBIDDEN.code)
        .json({ message: "Access token is invalid" });
    }
  }
};

module.exports = verifyAccessToken;
