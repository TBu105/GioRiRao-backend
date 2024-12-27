const bcrypt = require("bcrypt");

const hashPassword = async (clientPassword) => {
  const hashPassword = await bcrypt.hash(clientPassword, 10);
  return hashPassword;
};

const comparePassword = async (clientPassword, dbPassword) => {
  return await bcrypt.compare(clientPassword, dbPassword)
}

module.exports = {
  hashPassword,
  comparePassword
};
