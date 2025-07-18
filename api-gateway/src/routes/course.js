const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://course-service:8002",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/courses": "" },
  })
);

module.exports = router;
