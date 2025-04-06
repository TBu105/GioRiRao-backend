const Staff = require("../models/Staff");

const signUpStaff = async (data) => {
  const staff = new Staff(data);
  return await staff.save();
};

const findStaff = async (data) => {
  const staff = await Staff.findOne(data);
  return staff;
};

const findStaffById = async (staffId) => {
  const staff = await Staff.findById(staffId, { deleted: false });
  return staff;
};

const updateStaff = async (staffId, staffData) => {
  const updatedStaff = await Staff.findByIdAndUpdate(staffId, staffData, {
    new: true,
  });

  return updatedStaff;
};

module.exports = {
  signUpStaff,
  findStaff,
  findStaffById,
  updateStaff,
};
