require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8007;
const connection = require("./configs/DB.config");
const initRoute = require("./routes/index.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoute(app);

const startServer = async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log("ERROR starting server");
    process.exit(1);
  }
};

startServer();
