const express = require("express");
const routerAPI = express.Router();
const lessonController = require("../controllers/lesson.controller");

routerAPI.post("/", lessonController.createLessonAPI);
routerAPI.put("/", lessonController.updateLessonAPI);
routerAPI.get("/id/:id", lessonController.getLessonAPI);
routerAPI.get("/multiple", lessonController.getAllLessonAPI);
routerAPI.delete("/", lessonController.deleteLessonAPI);

module.exports = routerAPI;
