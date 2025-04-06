const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");

// staff-updateStaff
const updateStaff = async (staffId, staffData) => {
  const existingStaff = await staffRepository.findStaffById(staffId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }

  const updatedStaff = await staffRepository.updateStaff(staffId, staffData);

  return updatedStaff;
};

const getStaffInfoById = async (staffId) => {
  const existingStaff = await staffRepository.findStaffById(staffId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }

  return existingStaff;
};

module.exports = {
  updateStaff,
  getStaffInfoById,
};
