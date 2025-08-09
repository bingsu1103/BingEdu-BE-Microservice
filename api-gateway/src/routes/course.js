const { Router } = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "https://bingedu-be-microservice-course-service.onrender.com",
    changeOrigin: true,
    pathRewrite: { "^/v1/api/courses": "" },
  })
);

module.exports = router;
