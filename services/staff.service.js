const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");

// staff-updateStaff
const updateStaff = async (data) => {
  const existingStaff = await staffRepository.findStaffById(data.adminId);

  if (!existingStaff) {
    throw new BadRequest("Staff account not found.");
  }
  
  const updatedStaff = await staffRepository.updateStaff(data);

  return updatedStaff;
};

module.exports = {
  updateStaff,
};
