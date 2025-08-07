const { generateText } = require("../models/ai");
async function askGemini(prompt) {
  const reply = await generateText(prompt);

  return {
    status: true,
    EC: 0,
    message: "Reply from Gemini",
    data: reply,
  };
}

module.exports = { askGemini };
