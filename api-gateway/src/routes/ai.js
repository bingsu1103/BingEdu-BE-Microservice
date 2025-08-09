const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "https://bingedu-be-microservice-ai-service.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/ai": "" },
  })
);

module.exports = router;
