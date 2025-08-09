const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  const expectedKey = process.env.INTERNAL_API_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: "Server misconfiguration: INTERNAL_API_KEY is not set",
      data: null,
    });
  }

  if (apiKey !== expectedKey) {
    return res
      .status(401)
      .json({ status: false, EC: 1, message: "Unauthorized", data: null });
  }
  next();
};
module.exports = authenticateApiKey;
