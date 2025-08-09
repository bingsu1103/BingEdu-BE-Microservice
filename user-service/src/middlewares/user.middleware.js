const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
module.exports = authenticateApiKey;
