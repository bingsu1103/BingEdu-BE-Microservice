const express = require("express");
const router = express.Router();
const handleGeminiRequest = require("../controllers/geminiController");

router.post("/ask", handleGeminiRequest);
router.post("/mark", handleGeminiMark);

module.exports = router;
