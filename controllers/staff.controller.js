const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");
const staffService = require("../services/staff.service");

const getStaffInfoById = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const staff = await staffService.getStaffInfoById(staffId);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Get staff information successfully",
    staff,
  });
});

const updateStaffById = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const staffData = req.body;
  const staff = await staffService.updateStaff(staffId, staffData);
  return res.status(HttpStatusCodes.OK.code).json({
    message: "Update staff information successfully",
    staff,
  });
});

module.exports = {
  getStaffInfoById,
  updateStaffById,
};
