// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "deou3ybsb",
  api_key: "492671921882823",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
