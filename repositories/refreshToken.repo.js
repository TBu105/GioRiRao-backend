const RefreshToken = require("../models/RefreshToken");

const createRefreshToken = async (data) => {
  const refreshToken = new RefreshToken(data);
  return await refreshToken.save();
};


module.exports = {
  createRefreshToken,
};
