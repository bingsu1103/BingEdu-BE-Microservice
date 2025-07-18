const userController = require("../controllers/user.controller");
const express = require("express");
const routerAPI = express.Router();
const authenticateApiKey = require("../middlewares/user.middleware");

routerAPI.post("/", userController.createUserAPI);
routerAPI.get("/", userController.getAllUserAPI);
routerAPI.get("/id/:id", userController.getAUserAPI);
routerAPI.get("/email/:email", userController.getAUserEmailAPI);
routerAPI.put("/", userController.updateUserAPI);
routerAPI.delete("/", userController.deleteUserAPI);
routerAPI.post(
  "/check-password",
  authenticateApiKey,
  userController.isPasswordMatchAPI
);
routerAPI.post("/update-password", userController.updatePasswordAPI);

module.exports = routerAPI;
