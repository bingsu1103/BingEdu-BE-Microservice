const apiRoute = require("./api.route");

const initRoute = (app) => {
    app.use("/v1/api", apiRoute);
}
module.exports = initRoute;