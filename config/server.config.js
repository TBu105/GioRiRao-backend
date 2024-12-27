require("dotenv").config();

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    port: process.env.DEV_DB_PORT,
    host: process.env.DEV_DB_HOST,
    name: process.env.DEV_DB_NAME,
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3055,
  },
  db: {
    port: process.env.PROD_DB_PORT,
    host: process.env.PROD_DB_HOST,
    name: process.env.PROD_DB_NAME,
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "prod";

module.exports = config[env];
