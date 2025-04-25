const RefreshToken = require("../models/RefreshToken");

const createRefreshToken = async (data) => {
  const refreshToken = new RefreshToken(data);
  return await refreshToken.save();
};

const revokeRefreshToken = async (data) => {
  const query = { ...data, revoked: false };

  const revoke = await RefreshToken.findOneAndUpdate(
    query,
    { revoked: true },
    { new: true }
  );

  return revoke;
};

const getRefreshToken = async (data) => {
  const query = { ...data, revoked: false };

  const refreshToken = await RefreshToken.findOne(query);

  return refreshToken;
};

module.exports = {
  createRefreshToken,
  revokeRefreshToken,
  getRefreshToken,
};
