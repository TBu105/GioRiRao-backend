const authService = require("../services/auth.service");
const uploadService = require("../services/upload.service");
const staffService = require("../services/staff.service");
const refreshTokenService = require("../services/refresh.token.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

// chưa hoàn thành, chưa có validation
const signUpAdmin = asyncHandler(async (req, res) => {
  const admin = await authService.signUpAdmin(req.body);

  if (!req.file) {
    return res.status(HttpStatusCodes.CREATED.code).json({
      message: "Create admin account successfully",
      admin,
    });
  }

  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Create admin account successfully, image is processing...",
    admin,
  });

  const uploadAvatar = await uploadService.uploadImage(req.file, {
    folderName: "staffAvatar",
    imgHeight: 300,
    imgWidth: 300,
  });

  const payload = {
    avatar: uploadAvatar.photoUrl,
  };

  const updateStaff = staffService.updateStaff(admin._id, payload);

  return updateStaff;
});

// chưa hoàn thành, chưa có validation
const signUpStaff = asyncHandler(async (req, res) => {
  const staff = await authService.signUpStaff(req.body);

  if (!req.file) {
    return res.status(HttpStatusCodes.CREATED.code).json({
      message: "Create staff account successfully",
      staff,
    });
  }

  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Create staff account successfully, image is processing...",
    staff,
  });

  const uploadAvatar = await uploadService.uploadImage(req.file, {
    folderName: "staffAvatar",
    imgHeight: 300,
    imgWidth: 300,
  });

  const payload = {
    avatar: uploadAvatar.photoUrl,
  };

  const updateStaff = staffService.updateStaff(staff._id, payload);

  return updateStaff;
});

const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginStaff(email, password);

  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true, // Prevents access via JavaScript
    secure: true, // Ensures cookies are sent over HTTPS
    sameSite: "Strict", // Prevents cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifespan (1 week)
  });

  res.cookie("accessToken", token.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000, // Cookie lifespan (1 hour)
  });

  return res
    .status(HttpStatusCodes.OK.code)
    .json({ message: "Login successfully!!!" });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const newAccessToken = await refreshTokenService(req.user.userId);

  return res
    .status(HttpStatusCodes.OK.code)
    .json({ message: "Refresh access token successfully", newAccessToken });
});

const getMeInfo = asyncHandler(async (req, res) => {
  const { userId, role, storeId } = req.user;

  const me = {
    userId,
    role,
    storeId,
  };

  return res
    .status(HttpStatusCodes.OK.code)
    .json({ message: "Get me information successfully", me });
});

const isUserLogin = asyncHandler(async (req, res) => {
  const isAuth = await authService.getStaffInfo(req.user.userId);

  return res
    .status(HttpStatusCodes.OK.code)
    .json({ message: "Verify authentication successfully", isAuth });
});

const logOut = asyncHandler(async (req, res) => {
  const logOut = await authService.logOut(req.user.userId);

  // Xóa cookies phía client
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return res.status(HttpStatusCodes.OK.code).json({ message: logOut });
});

module.exports = {
  signUpAdmin,
  signUpStaff,
  loginStaff,
  refreshAccessToken,
  getMeInfo,
  isUserLogin,
  logOut,
};
