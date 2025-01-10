const authService = require("../services/auth.service");
const uploadService = require("../services/upload.service");
const staffService = require("../services/staff.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

// chưa hoàn thành, cần đăng nhập để lấy req.user và chưa kiểm tra role
const signUpAdmin = asyncHandler(async (req, res) => {
  const admin = await authService.signUpAdmin(req.body);

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
    adminId: admin._id,
    avatar: uploadAvatar.photoUrl,
  };

  const updateStaff = staffService.updateStaff(payload);

  return updateStaff;
});

// chưa hoàn thành
const signUpStaff = asyncHandler(async (req, res) => {
  const staff = await authService.signUpStaff(req.body);

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
    staffId: staff._id,
    avatar: uploadAvatar.photoUrl,
  };

  const updateStaff = staffService.updateStaff(payload);

  return updateStaff;
});

const loginStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginStaff(email, password);

  res.status(HttpStatusCodes.OK.code).json({ token });
});

module.exports = {
  signUpAdmin,
  signUpStaff,
  loginStaff,
};
