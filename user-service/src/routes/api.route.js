const userController = require("../controllers/user.controller");
const express = require("express");
const routerAPI = express.Router();
// const authenticateApiKey = require("../middlewares/user.middleware");

routerAPI.post("/", userController.createUserAPI);
routerAPI.get("/", userController.getAllUserAPI);
routerAPI.get("/id/:id", userController.getAUserAPI);
routerAPI.get("/email/:email", userController.getAUserEmailAPI);
routerAPI.put("/", userController.updateUserAPI);
routerAPI.delete("/id/:id", userController.deleteUserAPI);
routerAPI.post("/check-password", userController.isPasswordMatchAPI);
routerAPI.post("/update-password", userController.updatePasswordAPI);
routerAPI.get("/paginate", userController.getUserWithPaginationAPI);

module.exports = routerAPI;
