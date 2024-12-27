const Redis = require("ioredis");

// Create a Redis client
const redisClient = new Redis({
  host: "127.0.0.1", // Redis server address
  port: 6379, // Redis server port
  password: "redis123", // If applicable
  // Additional options can be set here
});

// Handle connection errors
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
