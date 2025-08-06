const express = require("express");
const routerAPI = express.Router();
const reviewController = require("../controllers/review.controller");

routerAPI.post("/", reviewController.createReviewAPI);
routerAPI.get("/course/:id", reviewController.getReviewAPI);
routerAPI.put("/", reviewController.updateReviewAPI);
routerAPI.delete("/:id", reviewController.deleteReviewAPI);
routerAPI.get("/", reviewController.getAllReviewsAPI);

module.exports = routerAPI;
