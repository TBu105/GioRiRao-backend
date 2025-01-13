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
      console.log("result:::", result);
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
    const photosUrl = [];

    for (let i = 0; i < files.length; i++) {
      const result = await cloudinary.uploader.upload(files[i].path, {
        //   public_id: "thumb",
        folder: folderName,
        format: imgFormat,
        height: Number(imgHeight),
        width: Number(imgWidth),
        crop: "fill",
      });

      photosUrl.push(result.secure_url);
    }
    return { photosUrl };
  }
}

module.exports = new UploadService();
