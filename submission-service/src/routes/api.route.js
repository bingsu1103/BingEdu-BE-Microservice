const submissionController = require("../controllers/submission.controller");
const express = require("express");
const routerAPI = express.Router();

routerAPI.post("/", submissionController.createSubmissionAPI);
routerAPI.get("/", submissionController.getAllSubmissionsAPI);
routerAPI.get("/id/:id", submissionController.getSubmissionByIdAPI);
routerAPI.get("/user/:userId", submissionController.getSubmissionsByUserIdAPI);
routerAPI.get(
  "/lesson/:lessonId",
  submissionController.getSubmissionsByLessonIdAPI
);
routerAPI.delete("/id/:id", submissionController.deleteSubmissionAPI);

module.exports = routerAPI;
