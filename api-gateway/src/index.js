const express = require("express");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const lessonRoutes = require("./routes/lesson");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const uploadRoutes = require("./routes/upload");
const reviewRoutes = require("./routes/review");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use("/v1/api/user", userRoutes);
app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/course", courseRoutes);
app.use("/v1/api/lesson", lessonRoutes);
app.use("/v1/api/question", questionRoutes);
app.use("/v1/api/answer", answerRoutes);
app.use("/v1/api/upload", uploadRoutes);
app.use("/v1/api/review", reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
