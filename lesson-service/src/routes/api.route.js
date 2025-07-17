const express = require("express");
const routerAPI = express.Router();
const lessonController = require("../controllers/lesson.controller")

routerAPI.post("/lesson", lessonController.createLessonAPI);
routerAPI.put("/lesson", lessonController.updateLessonAPI);
routerAPI.get("/lesson/id/:id", lessonController.getLessonAPI);
routerAPI.get("/lesson-multiple", lessonController.getAllLessonAPI);
routerAPI.delete("/lesson", lessonController.deleteLessonAPI);

module.exports = routerAPI;