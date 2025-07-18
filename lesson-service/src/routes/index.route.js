const routerAPI = require("./api.route");
const initRoute = (app) => {
  app.use("/", routerAPI);
};
module.exports = initRoute;
