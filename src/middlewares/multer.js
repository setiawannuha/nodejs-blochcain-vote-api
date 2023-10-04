const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const {CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_API_SECRET} = require('../helpers/env')

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-voting",
    format: async (req, file) => "png",
    public_id: (req, file) => "",
  },
});
const parser = multer({ storage: storage });


const destroyFile = async(url) => {
  const publicIdToDelete = url.split("/").pop().split(".")[0];
  cloudinary.uploader.destroy(`e-voting/${publicIdToDelete}`, {resource_type: "image"}, (error, result) => {
    console.log(url, publicIdToDelete, error, result);
  })
}
module.exports = {
  parser,
  destroyFile
};
