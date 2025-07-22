const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://review-service:8007",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/reviews": "" },
  })
);

module.exports = router;
