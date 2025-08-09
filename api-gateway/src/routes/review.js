const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "https://bingedu-be-microservice-review-service.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/reviews": "" },
  })
);

module.exports = router;
