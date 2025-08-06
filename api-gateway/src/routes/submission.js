const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://submission-service:8009",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/submission": "" },
  })
);

module.exports = router;
