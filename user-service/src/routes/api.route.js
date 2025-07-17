const userController = require("../controllers/user.controller");
const express = require('express');
const routerAPI = express.Router();
const authenticateApiKey = require("../middlewares/user.middleware")

routerAPI.post('/user', userController.createUserAPI);
routerAPI.get('/user', userController.getAllUserAPI);
routerAPI.get('/user/id/:id', userController.getAUserAPI);
routerAPI.get('/user/email/:email', userController.getAUserEmailAPI);
routerAPI.put('/user', userController.updateUserAPI);
routerAPI.delete('/user', userController.deleteUserAPI);
routerAPI.post('/user/check-password', authenticateApiKey, userController.isPasswordMatchAPI);
routerAPI.post('/user/update-password', userController.updatePasswordAPI);

module.exports = routerAPI