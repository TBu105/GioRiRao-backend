const refreshTokenRepository = require("../repositories/refresh.token.repo");
const { BadRequest } = require("../config/error.response.config");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const HttpStatusCodes = require("../config/http.status.config");

// auth-refreshAccessToken
const refreshAccessToken = async (userId) => {
  // Nhận refresh token
  // Kiểm tra có refresh token
  // Kiểm tra tính hợp lệ: đúng refresh token, và còn thời hạn
  // Nếu hết hạn, ta revoke refresh token
  // Kiểm tra refresh token có bị thu hồi
  // Nếu vượt qua hết tất cả các trường hợp
  // Tạo và trả về 1 access token mới

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new BadRequest("There is no refresh token");
  }

  try {
    const decode = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const refreshTokenDB = await refreshTokenRepository.getRefreshToken({
      userId: decode.userId,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(HttpStatusCodes.FORBIDDEN.code)
        .json({ message: "Access token expired" });
    }
    return res
      .status(HttpStatusCodes.FORBIDDEN.code)
      .json({ message: "Access token is invalid" });
  }
};

module.exports = {
  refreshAccessToken,
};
