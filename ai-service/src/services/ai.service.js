const { generateText } = require("../models/geminiModel");

async function askGemini(prompt) {
  const reply = await generateText(prompt);

  return reply;
}

module.exports = { askGemini };
