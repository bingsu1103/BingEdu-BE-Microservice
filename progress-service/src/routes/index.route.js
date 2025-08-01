const routerAPI = require("../routes/api.route");

const initRoute = (app) => {
  app.use("/", routerAPI);
};
module.exports = initRoute;
