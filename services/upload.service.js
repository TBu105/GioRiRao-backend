const cloudinary = require("../config/cloundinary.config");
const { BadRequest } = require("../config/error.response.config");
const fs = require("fs/promises");

class UploadService {
  async uploadImage(
    filePath,
    { folderName = "test", imgHeight, imgWidth, imgFormat = "webp" }
  ) {
    try {
      if (!filePath) {
        throw new BadRequest("There is no file uploaded");
      }

      const result = await cloudinary.uploader.upload(filePath.path, {
        //   public_id: "thumb",
        folder: folderName,
        format: imgFormat,
        height: Number(imgHeight),
        width: Number(imgWidth),
        crop: "fill", // Ensures the image is resized proportionally
      });

      return { photoUrl: result.secure_url };
    } finally {
      // Clean up local files
      fs.unlink(filePath.path).catch(console.error);
    }
  }

  async uploadImages(
    files,
    { folderName = "test", imgHeight, imgWidth, imgFormat = "webp" }
  ) {
    const resizeUrl = [];
    const photosUrl = [];

    for (let i = 0; i < files.length; i++) {
      const result = await cloudinary.uploader.upload(files[i].path, {
        //   public_id: "thumb",
        folder: folderName,
        format: imgFormat,
      });

      const resize = cloudinary.url(result.public_id, {
        height: Number(imgHeight),
        width: Number(imgWidth),
        crop: "fill", // Ensures the image is resized proportionally
      });

      photosUrl.push(result.secure_url);
      resizeUrl.push(resize);
    }
    console.log("photosUrl:::", photosUrl);
    console.log("resizeUrl:::", resizeUrl);

    return { photosUrl, resizeUrl };
  }
}

module.exports = new UploadService();
