const cloudinary = require("../config/cloundinary.config");

class UploadService {
  async uploadImageFromLocal(
    path,
    { folderName = "test", imgHeight, imgWidth, imgFormat = "jpg" }
  ) {
    const result = await cloudinary.uploader.upload(path, {
      //   public_id: "thumb",
      folder: folderName,
    });

    const resizeUrl = cloudinary.url(result.public_id, {
      height: Number(imgHeight),
      width: Number(imgWidth),
      format: imgFormat,
      crop: "fill", // Ensures the image is resized proportionally
    });

    console.log("result:::", result);
    return { photoUrl: result.secure_url, resizeUrl };
  }

  async uploadImagesFromLocal(
    files,
    { folderName = "test", imgHeight, imgWidth, imgFormat = "jpg" }
  ) {
    const resizeUrl = [];
    const photosUrl = [];

    for (let i = 0; i < files.length; i++) {
      const result = await cloudinary.uploader.upload(files[i].path, {
        //   public_id: "thumb",
        folder: folderName,
      });

      const resize = cloudinary.url(result.public_id, {
        height: Number(imgHeight),
        width: Number(imgWidth),
        format: imgFormat,
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
