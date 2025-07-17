const express = require("express");
const routerAPI = express.Router();
const answerController = require("../controllers/answer.controller");

routerAPI.post("/answer", answerController.createAnswerAPI);
routerAPI.post("/answer-multiple", answerController.createMultipleAnswerAPI);
routerAPI.delete(
  "/answer-multiple",
  answerController.deleteMultipleAnswerByLessonIdAPI
);

module.exports = routerAPI;
