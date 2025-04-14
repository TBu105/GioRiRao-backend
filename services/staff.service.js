const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");

const createStaff = async (data) => {
  /**
   * Logic:
   * Kiểm tra đã có staff trước đó ?
   * Nếu có, lỗi
   * Tiến hành thêm staff vào db
   */

  const existingStaff = await staffRepository.findStaff({
    email: data.email,
  });

  if (existingStaff) {
    throw new BadRequest("Staff is already exist");
  }

  const newStaff = await staffRepository.createStaff(data);

  return newStaff;
};
// staff-updateStaff
const updateStaff = async (staffId, data) => {
  console.log("req.user");

  const existingStaff = await staffRepository.findStaffById(staffId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }

  const updatedStaff = await staffRepository.updateStaff(staffId, data);

  return updatedStaff;
};
const getStaffById = async (staffId) => {
  const existingStaff = await staffRepository.findStaffById(staffId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }

  return existingStaff;
};

const getAllStaff = async () => {
  const staff = await staffRepository.findAllStaff();

  if (!staff) {
    throw new BadRequest("Staff account not found.");
  }

  return staff;
};
const deleteStaff = async (staffId) => {
  const existingStaff = await staffRepository.deleteStaff(staffId);
  return existingStaff;
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  getStaffById,
  deleteStaff,
};
