const jwt = require("jsonwebtoken");
const axios = require("axios")

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json(
                {
                    status: false,
                    EC: -1,
                    message: "Can not found access token",
                    data: null,
                }
            )
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const url = `${process.env.USER_SERVICE_URL}/id/${decoded.id}`;
        const dataRes = await axios.get(url);

        const user = dataRes.data.data;
        if (!user) {
            return res.status(401).json({
                status: false,
                error: -1,
                message: "User not found",
                data: null,
            });
        }

        if (!user.is_active) {
            return res.status(401).json({
                status: false,
                error: -1,
                message: "Account is deleted or banned",
                data: null,
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            error: -1,
            message: "Invalid token or expired",
            data: null,
        });
    }
}
module.exports = verifyToken 