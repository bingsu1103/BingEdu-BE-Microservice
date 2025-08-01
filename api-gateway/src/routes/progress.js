const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://progress-service:8008",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/progress": "" },
  })
);

module.exports = router;
