const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://question-service:8005",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/questions": "" },
  })
);

module.exports = router;
