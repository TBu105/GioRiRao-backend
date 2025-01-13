const Staff = require("../models/Staff");

const signUpStaff = async (data) => {
  const staff = new Staff(data);
  return await staff.save();
};

const findStaff = async (data) => {
  const staff = await Staff.findOne(data);
  return staff;
};

const findStaffById = async (id) => {
  const staff = await Staff.findById(id);
  return staff;
};

const updateStaff = async (staffId, data) => {
  const updatedStaff = await Staff.findByIdAndUpdate(staffId, data, {
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
