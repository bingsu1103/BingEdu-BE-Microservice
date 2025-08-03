const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://ai-service:8010",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/ask": "" },
  })
);

module.exports = router;
