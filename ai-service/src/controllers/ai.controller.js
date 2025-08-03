const { askGemini } = require("../services/geminiService");
const axios = require("axios");

// const handleGeminiRequest = async (req, res) => {
//   const { prompt } = req.body;
//   if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//   try {
//     const result = await axios.get(
//       `${process.env.BASE_API_URL}/v1/api/product`
//     );
//     const listProducts = result.data.data;
//     const productInfo = listProducts
//       .map((p, i) => `${i + 1}. ${p.name} - ${p.price} VNĐ\n`)
//       .join("");
//     const fullPrompt = `Dưới đây là danh sách các sản phẩm hiện có trong cửa hàng:

//         ${productInfo}

//         Bây giờ hãy trả lời câu hỏi sau của khách hàng một cách thân thiện:
//         ${prompt}
//         `;
//     const question = await askGemini(fullPrompt);
//     res.json({ reply: question });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Gemini API failed" });
//   }
// };

const handleGeminiMark = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const result = await axios.get(
      `${process.env.BASE_API_URL}/v1/api/product`
    );
  }
};
module.exports = {handleGeminiMark};
