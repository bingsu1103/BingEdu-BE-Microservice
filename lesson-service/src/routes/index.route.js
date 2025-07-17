const routerAPI = require("./api.route");
const initRoute = (app) => {
    app.use("/v1/api", routerAPI);
}
module.exports = initRoute;