const authRoute = require("./auth.route");

const initRoute = (app) => {
  app.use("/", authRoute);
};
module.exports = initRoute;
