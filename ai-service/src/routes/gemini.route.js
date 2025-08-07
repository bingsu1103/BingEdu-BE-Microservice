const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.post("/mark", aiController.handleGeminiMark);

module.exports = router;
