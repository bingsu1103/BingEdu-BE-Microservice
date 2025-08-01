const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://lesson-service:8004",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/lesson": "" },
  })
);

module.exports = router;
