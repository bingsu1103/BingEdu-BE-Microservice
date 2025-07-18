module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: false,
    message: err.message || "Internal Server Error",
  });
};
