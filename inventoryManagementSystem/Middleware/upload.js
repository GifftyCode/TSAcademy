const multer = require("multer");
const { cloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new cloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bokusuppermat",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
