const uploadRoute = require("./upload.route");

const initRoute = (app) => {
  app.use("/", uploadRoute);
};
module.exports = initRoute;
