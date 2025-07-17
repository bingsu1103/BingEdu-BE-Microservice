require("dotenv").config();
const express = require("express");
const initRoute = require("./routes/index.route");
const app = express();
const port = process.env.PORT || 8003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoute(app);

const startServer = () => {
    try {
        app.listen(port, () => {
            console.log(`Upload Service is listening on port: ${port}`);
        });
    } catch (error) {
        console.log("Error starting server:", error);
        process.exit(1);
    }
}
startServer();