const express = require("express");
const routerAPI = express.Router();
const uploadController = require("../controllers/upload.controller");
const handleUploadError = require("../middlewares/upload.middleware");
const upload = require("../configs/upload.config")

routerAPI.post("/upload-img", upload.single("image"), uploadController.uploadImgAPI, handleUploadError);

module.exports = routerAPI;