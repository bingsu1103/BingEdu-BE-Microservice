const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// 🔸 Cấu hình lưu ảnh
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bingeduimg/avatar",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "avif"],
    transformation: [{ width: 600, height: 600, crop: "limit" }],
  },
});
const imageQuestionStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bingeduimg/question",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "avif"],
    transformation: [{ width: 600, height: 600, crop: "limit" }],
  },
});

const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "bingeduimg/audio",
    allowed_formats: ["mp3", "wav", "ogg", "m4a"],
    resource_type: "video",
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 1024 * 1024 * 2 },
});

const uploadImgQuestion = multer({
  storage: imageQuestionStorage,
  limits: { fileSize: 1024 * 1024 * 2 },
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: { fileSize: 1024 * 1024 * 10 },
});

module.exports = {
  uploadAvatar,
  uploadImgQuestion,
  uploadAudio,
};
