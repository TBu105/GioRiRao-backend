require("dotenv").config();

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    name: process.env.DEV_DB_NAME,
    password: process.env.DEV_DB_PASSWORD,
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3055,
  },
  db: {
    name: process.env.PROD_DB_NAME,
    password: process.env.DEV_DB_PASSWORD,
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "prod";

module.exports = config[env];
