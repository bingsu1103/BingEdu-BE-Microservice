require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const initRoute = require("./routes/index.route");
const connection = require("./configs/DB.config");

const port = process.env.PORT || 8001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

initRoute(app);

const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
    process.exit(1);
  }
};
startServer();
