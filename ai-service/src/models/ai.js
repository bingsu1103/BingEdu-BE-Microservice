const genAI = require("../configs/geminiConfig");

const generateText = async (prompt) => {
  const result = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1000,
    },
  });

  return result.text;
};

module.exports = { generateText };
