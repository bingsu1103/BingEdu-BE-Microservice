const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "https://bingedu-be-microservice-question-service.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/questions": "" },
  })
);

module.exports = router;
