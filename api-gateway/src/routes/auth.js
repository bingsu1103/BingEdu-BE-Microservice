const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://auth-service:8001",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/auth": "" },
  })
);

module.exports = router;
