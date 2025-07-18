const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://answer-service:8006",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/answers": "" },
  })
);

module.exports = router;
