const Redis = require("ioredis");
require("dotenv").config();

// Create a Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST, // Redis server address
  port: process.env.REDIS_PORT, // Redis server port
  password: process.env.REDIS_PASSWORD, // If applicable
  // Additional options can be set here
});

// Handle connection errors
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
