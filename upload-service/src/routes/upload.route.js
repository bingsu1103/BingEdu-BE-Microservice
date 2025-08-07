const express = require("express");
const routerAPI = express.Router();
const uploadController = require("../controllers/upload.controller");
const handleUploadError = require("../middlewares/upload.middleware");
const upload = require("../configs/upload.config");

routerAPI.post(
  "/upload-img",
  upload.uploadImgQuestion.single("image"),
  uploadController.uploadImgAPI,
  handleUploadError
);
routerAPI.post(
  "/upload-avatar",
  upload.uploadAvatar.single("image"),
  uploadController.uploadImgAPI,
  handleUploadError
);

routerAPI.post(
  "/upload-audio",
  upload.uploadAudio.single("audio"),
  handleUploadError,
  uploadController.uploadAudioAPI
);

module.exports = routerAPI;
