const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dowfl0pfi",
  api_key: "642258214598339",
  api_secret: "TZcVcr51ep21dR0EMkAofdBf5EE",
  secure: true,
});

module.exports = cloudinary;
