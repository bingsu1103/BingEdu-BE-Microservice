const express = require("express");
const routerAPI = express.Router();
const courseProgressController = require("../controllers/coursesProgress.controller");
const lessonProgressController = require("../controllers/lessonProgress.controller");

routerAPI.post("/courses", courseProgressController.createCourseProgressAPI);
routerAPI.put("/courses", courseProgressController.updateCourseProgressAPI);
routerAPI.get("/courses", courseProgressController.getCoursesProgressAPI);
routerAPI.post("/lessons", lessonProgressController.createLessonProgressAPI);
routerAPI.get(
  "/lessons/userId/:userId/lessonId/:lessonId",
  lessonProgressController.getLessonProgressAPI
);

module.exports = routerAPI;
