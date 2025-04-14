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
  const staff = await Staff.findById(id).lean();
  return staff;
};

const updateStaff = async (staffId, data) => {
  const updatedStaff = await Staff.findByIdAndUpdate(staffId, data, {
    new: true,
  });

  return updatedStaff;
};
const createStaff = async (data) => {
  const staff = new Staff(data);
  return await staff.save();
};
const findAllStaff = async () => {
  const staff = await Staff.find({}).lean();
  return staff;
};
const deleteStaff = async (id) => {
  const deletedStaff = await Staff.findByIdAndDelete(id);
  return deletedStaff;
};
module.exports = {
  deleteStaff,
  findAllStaff,
  createStaff,
  signUpStaff,
  findStaff,
  findStaffById,
  updateStaff,
};
