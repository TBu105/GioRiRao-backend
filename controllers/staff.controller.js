const staffService = require("../services/staff.service");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const uploadService = require("../services/upload.service");

const createStaff = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please provide staff image" });
  }

  // Tạo promise upload ảnh
  const uploadPromise = uploadService.uploadImage(req.file, {
    folderName: "staffThumbnails",
    imgHeight: 300,
    imgWidth: 300,
  });

  // Tạo promise tạo staff (chưa có ảnh)
  const createStaffPromise = staffService.createStaff(req.body);

  // Chạy song song
  const [staffThumbnail, newStaff] = await Promise.all([
    uploadPromise,
    createStaffPromise,
  ]);

  // Cập nhật staff với đường dẫn ảnh
  const updatedStaff = await staffService.updateStaff(newStaff._id, {
    thumbnail: staffThumbnail.photoUrl,
  });

  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Staff created successfully!",
    newStaff: updatedStaff,
  });
});

const getStaffById = asyncHandler(async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await staffService.getStaffById(staffId);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    return res.status(200).json({
      message: "Get staff successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Error in getStaffById:", error); // 👈 log lỗi
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
const getAllStaff = asyncHandler(async (req, res) => {
  try {
    const staff = await staffService.getAllStaff();
    return res.status(200).json({
      message: "Get all staff successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Error in getAllStaff:", error); // 👈 log lỗi
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
const updateStaff = asyncHandler(async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedStaff = await staffService.updateStaff(staffId, req.body);

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    return res.status(200).json({
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Error in updateStaff:", error); // 👈 log lỗi
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
const deleteStaff = asyncHandler(async (req, res) => {
  try {
    const staffId = req.params.id;
    const deletedStaff = await staffService.deleteStaff(staffId);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    return res.status(200).json({
      message: "Staff deleted successfully",
      data: deletedStaff,
    });
  } catch (error) {
    console.error("Error in deleteStaff:", error); // 👈 log lỗi
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
