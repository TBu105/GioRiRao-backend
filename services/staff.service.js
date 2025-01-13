const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");

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

module.exports = {
  updateStaff,
};
