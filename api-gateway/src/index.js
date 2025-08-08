require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const lessonRoutes = require("./routes/lesson");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const uploadRoutes = require("./routes/upload");
const reviewRoutes = require("./routes/review");
const progressRoutes = require("./routes/progress");
const submissionRoutes = require("./routes/submission");
const aiRoutes = require("./routes/ai");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
      "Origin",
      "Accept",
      "X-Requested-With",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials",
      "delay",
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 204,
  })
);

app.use("/v1/api/user", userRoutes);
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/course", courseRoutes);
app.use("/v1/api/lesson", lessonRoutes);
app.use("/v1/api/question", questionRoutes);
app.use("/v1/api/answer", answerRoutes);
app.use("/v1/api/upload", uploadRoutes);
app.use("/v1/api/review", reviewRoutes);
app.use("/v1/api/progress", progressRoutes);
app.use("/v1/api/submission", submissionRoutes);
app.use("/v1/api/ai", aiRoutes);
app.use("/v1/api/order", orderRoutes);
app.use("/v1/api/payment", paymentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
