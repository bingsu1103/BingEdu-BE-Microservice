const apiRoute = require("./api.route");

const initRoute = (app) => {
  app.use("/", apiRoute);
};
module.exports = initRoute;
