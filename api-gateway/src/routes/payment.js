const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://payment-service:8012",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/payments": "" },
  })
);

module.exports = router;
