const express = require("express");
const routerAPI = express.Router();
const courseController = require("../controllers/courses.controller");

routerAPI.post("/", courseController.createCourseAPI);
routerAPI.put("/", courseController.updateCourseAPI);
routerAPI.get("/id/:id", courseController.getCourseAPI);
routerAPI.get("/multiple", courseController.getAllCoursesAPI);
routerAPI.delete("/", courseController.deleteCourseAPI);

module.exports = routerAPI;
