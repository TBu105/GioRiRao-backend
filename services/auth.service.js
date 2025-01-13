const staffRepository = require("../repositories/staff.repo");
const storeRepository = require("../repositories/store.repo");
const { BadRequest } = require("../config/error.response.config");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const refreshTokenRepository = require("../repositories/refresh.token.repo");

// auth-signUpAdmin
const signUpAdmin = async (data) => {
  const existingAdmin = await staffRepository.findStaff({ email: data.email });
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
  console.log("data ", data.managerId);
  console.log("data ", typeof data.managerId);

  // const [existingStaff, store] = await Promise.all([
  //   staffRepository.findStaff({ email: data.email }),
  //   storeRepository.findStore({ managerId: data.managerId }),
  // ]);

  const existingStaff = await staffRepository.findStaff({ email: data.email });

  const store = await storeRepository.findStore({ managerId: data.managerId });

  if (existingStaff) {
    throw new BadRequest("Staff account with this email already exists.");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  const newStaff = await staffRepository.signUpStaff(data);

  console.log("newStaff", newStaff);
  console.log("store", store);

  await storeRepository.updateStoreStaff(store._id, newStaff._id);

  return newStaff;
};

// auth-loginStaff
const loginStaff = async (email, password) => {
  const staff = await staffRepository.findStaff({ email: email });
  if (!staff) {
    throw new BadRequest("Invalid email or password.");
  }

  const [match] = await Promise.all([
    bcrypt.compare(password, staff.password),
    refreshTokenRepository.revokeRefreshToken({ userId: staff._id }),
  ]);

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
