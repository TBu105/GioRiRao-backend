const Staff = require("../models/Staff");

const signUpStaff = async (data) => {
  const staff = new Staff(data);
  return await staff.save();
};

const findStaffByEmail = async (email) => {
  const staff = await Staff.findOne({ email });
  return staff;
};

const findStaffById = async (id) => {
  const staff = await Staff.findById(id);
  return staff;
};

const updateStaff = async (data) => {
  const updatedStaff = await Staff.findByIdAndUpdate(data.adminId, data, {
    new: true,
  });

  return updatedStaff;
};

module.exports = {
  signUpStaff,
  findStaffByEmail,
  findStaffById,
  updateStaff,
};
