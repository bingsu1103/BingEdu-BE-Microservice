const express = require("express");
const routerAPI = express.Router();
const questionController = require("../controllers/question.controller");

routerAPI.post("/", questionController.createQuestionAPI);
routerAPI.post("/multiple", questionController.createMultipleQuestionAPI);
routerAPI.put("/", questionController.updateQuestionAPI);
routerAPI.get("/id/:id", questionController.getQuestionAPI);
routerAPI.get("/", questionController.getAllQuestionAPI);
routerAPI.get("/lesson/:id", questionController.getQuestionByLessonIdAPI);
routerAPI.get(
  "/lesson/answer/:id",
  questionController.getQuestionByLessonIdAPI
);
routerAPI.delete("/id/:id", questionController.deleteQuestionAPI);

module.exports = routerAPI;
