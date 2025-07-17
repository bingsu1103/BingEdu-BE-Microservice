const express = require("express");
const routerAPI = express.Router();
const questionController = require('../controllers/question.controller')

routerAPI.post("/question", questionController.createQuestionAPI);
routerAPI.post("/question-multiple", questionController.createMultipleQuestionAPI);
routerAPI.put("/question", questionController.updateQuestionAPI);
routerAPI.get("/question/id/:id", questionController.getQuestionAPI);
routerAPI.get("/question", questionController.getAllQuestionAPI);
routerAPI.get("/question/lesson/:id", questionController.getQuestionByLessonId);
routerAPI.delete("/question", questionController.deleteQuestionAPI);

module.exports = routerAPI;