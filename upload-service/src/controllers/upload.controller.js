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
            data: null
        }
    }
}
module.exports = { uploadImgAPI }