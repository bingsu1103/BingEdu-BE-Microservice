const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://user-service:8000",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/users": "" },
  })
);

module.exports = router;
