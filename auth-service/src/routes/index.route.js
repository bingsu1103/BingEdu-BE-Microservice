const authRoute = require("./auth.route");

const initRoute = (app) => {
    app.use("/v1/api/auth", authRoute);
}
module.exports = initRoute;