const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://upload-service:8003",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/upload": "" },
  })
);

module.exports = router;
