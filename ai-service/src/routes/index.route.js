const geminiRoute = require("./gemini.route");

const initRoute = (app) => {
  app.use("/", geminiRoute);
};

module.exports = initRoute;
