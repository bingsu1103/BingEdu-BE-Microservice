const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://order-service:8011",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/orders": "" },
  })
);

module.exports = router;
