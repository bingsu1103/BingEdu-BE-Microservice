const express = require("express");
const routerAPI = express.Router();
const answerController = require("../controllers/answer.controller");

routerAPI.post("/", answerController.createAnswerAPI);
routerAPI.post("/multiple", answerController.createMultipleAnswerAPI);
routerAPI.delete(
  "/multiple",
  answerController.deleteMultipleAnswerByLessonIdAPI
);
routerAPI.get(
  "/lesson/:id",
  answerController.deleteMultipleAnswerByLessonIdAPI
);

module.exports = routerAPI;
