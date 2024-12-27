const crypto = require("crypto");
const { sign } = require("jsonwebtoken");

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString("hex");
};

const generateToken = (payload, secretKey, expireTime) => {
  // console.log("payload:::", payload);
  return sign(payload, secretKey, {
    expiresIn: expireTime,
    algorithm: "HS256",
  });
};

module.exports = {
  generateSecretKey,
  generateToken,
};
