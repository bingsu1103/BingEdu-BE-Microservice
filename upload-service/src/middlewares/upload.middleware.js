const multer = require("multer");
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res.status(400).json({
          status: false,
          error: 1,
          message: "Kích thước file không được vượt quá giới hạn cho phép",
          data: null,
        });
      case "LIMIT_FILE_COUNT":
        return res.status(400).json({
          status: false,
          error: 1,
          message: "Số lượng file vượt quá giới hạn cho phép",
          data: null,
        });
      case "LIMIT_UNEXPECTED_FILE":
        return res.status(400).json({
          status: false,
          error: 1,
          message:
            "Field không hợp lệ, vui lòng upload với field 'image' || 'audio",
          data: null,
        });
      default:
        return res.status(400).json({
          status: false,
          error: 1,
          message: "Lỗi upload file",
          data: null,
        });
    }
  }
  next(err);
};
module.exports = handleUploadError;
