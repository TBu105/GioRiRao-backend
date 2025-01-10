const staffRepository = require("../repositories/staff.repo");
const { BadRequest } = require("../config/error.response.config");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const refreshTokenRepository = require("../repositories/refreshToken.repo");

// auth-signUpAdmin
const signUpAdmin = async (data) => {
  const existingAdmin = await staffRepository.findStaffByEmail(data.email);
  if (existingAdmin) {
    throw new BadRequest("Admin account with this email already exists.");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  data.role = "admin";

  const newAdmin = await staffRepository.signUpStaff(data);

  return newAdmin;
};

// auth-signUpStaff
const signUpStaff = async (data) => {
  const existingStaff = await staffRepository.findStaffByEmail(data.email);
  if (existingStaff) {
    throw new BadRequest("Staff account with this email already exists.");
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const newStaff = await staffRepository.signUpStaff(data);

  return newStaff;
};

// auth-loginStaff
const loginStaff = async (email, password) => {
  const staff = await staffRepository.findStaffByEmail(email);
  if (!staff) {
    throw new BadRequest("Invalid email or password.");
  }

  const match = await bcrypt.compare(password, staff.password);
  if (!match) {
    throw new BadRequest("Invalid email or password.");
  }

  let payload = {
    userId: staff._id,
    role: staff.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

  const newRefreshToken = {
    userId: staff._id,
    userType: "Staff",
    refreshToken,
  };

  const savedRefreshToken = await refreshTokenRepository.createRefreshToken(
    newRefreshToken
  );

  const token = {
    accessToken,
    refreshToken: savedRefreshToken.refreshToken,
  };

  return token;
};

module.exports = {
  signUpAdmin,
  signUpStaff,
  loginStaff,
};
