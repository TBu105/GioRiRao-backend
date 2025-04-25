const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");
const { deleteStaff } = require("./store.service");

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
  const existingStaff = await staffRepository.findStaffById(staffId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }

  const updatedStaff = await staffRepository.updateStaff(staffId, data);

  return updatedStaff;
};
const getAllStaff = async () => {
  const staff = await staffRepository.findAllStaff();

  if (!staff) {
    throw new BadRequest("Staff not found.");
  }

  return staff;
};
const getStaffById = async (staffId) => {
  const staff = await staffRepository.findStaffById(staffId);

  if (!staff) {
    throw new BadRequest("Staff not found.");
  }

  return staff;
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  getStaffById,
  deleteStaff,
};
