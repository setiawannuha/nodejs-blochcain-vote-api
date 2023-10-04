require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  MONGODBURL: process.env.MONGODBURL,
  WEB3URL: process.env.WEB3URL,
  CONTRACTADDRESS: process.env.CONTRACTADDRESS,
  SENDERADDRESS: process.env.SENDERADDRESS,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}