const uploadService = require("../services/upload.service");

const uploadImgAPI = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        error: 1,
        message: "Missing file image",
        data: null,
      });
    }
    const result = await uploadService.uploadImage(req.file);
    return res.status(200).json(result);
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: "ERROR Upload IMG (SERVER)",
      data: null,
    };
  }
};

const uploadAudioAPI = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        error: 1,
        message: "Missing file audio",
        data: null,
      });
    }

    const result = await uploadService.uploadAudio(req.file);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: "ERROR Upload AUDIO (SERVER)",
      data: null,
    });
  }
};

module.exports = {
  uploadImgAPI,
  uploadAudioAPI,
};
