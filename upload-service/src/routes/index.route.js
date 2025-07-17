const uploadRoute = require("./upload.route")

const initRoute = (app) => {
    app.use("/v1/api", uploadRoute)
}
module.exports = initRoute;