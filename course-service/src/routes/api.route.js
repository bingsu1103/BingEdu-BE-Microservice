const express = require("express");
const routerAPI = express.Router();
const courseController = require("../controllers/courses.controller");

routerAPI.post('/courses', courseController.createCourseAPI);
routerAPI.put('/courses', courseController.updateCourseAPI);
routerAPI.get('/courses/id/:id', courseController.getCourseAPI);
routerAPI.get('/courses-multiple', courseController.getAllCoursesAPI);
routerAPI.delete('/courses', courseController.deleteCourseAPI);

module.exports = routerAPI;