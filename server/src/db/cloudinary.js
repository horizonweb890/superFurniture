const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dvlibz80r",
  api_key: 745595595787121,
  api_secret: "mil3iAz7z9bU__8oLSl2R-nE79I",
});

console.log(process.env.CLOUDINARY_CLOUD_NAME, "process.env.CLOUDINARY_CLOUD_NAME");

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File is uploaded on cloudinary", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};

module.exports = { uploadOnCloudinary };
