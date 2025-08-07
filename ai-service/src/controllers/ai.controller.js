// Import service của bạn ở đầu file controller
const { askGemini } = require("../services/ai.service"); // Giả sử bạn đặt file askGemini trong services/ai.service.js

const handleGeminiMark = async (req, res) => {
  const { listQuestion, answerToSubmit } = req.body;

  if (!listQuestion || !answerToSubmit) {
    return res
      .status(400)
      .json({ error: "listQuestion and answerToSubmit are required" });
  }

  try {
    // === BƯỚC 1: Chuẩn bị prompt ===
    const questionsJSON = JSON.stringify(listQuestion, null, 2);
    const answersJSON = JSON.stringify(answerToSubmit, null, 2);

    const fullPrompt = `Bạn là một giáo viên AI chuyên chấm điểm bài luận.
    
    Dưới đây là danh sách CÂU HỎI dạng JSON. Hãy chỉ xem xét những câu có "question_type" là "essay":
    ${questionsJSON}
    
    Và đây là danh sách CÂU TRẢ LỜI của học sinh. Hãy map câu trả lời với câu hỏi qua "_id" của câu hỏi và chỉ xét user_answer_text !== "" || null :
    ${answersJSON}
    
    YÊU CẦU:
    1. Chấm điểm ("score") cho mỗi bài luận từ 0 đến 1.
    2. Trả về KẾT QUẢ DUY NHẤT là một chuỗi JSON hợp lệ chứa một mảng các object. Không thêm bất kỳ giải thích nào khác. Mỗi object phải có cấu trúc:
    { "user_id": "string", "lesson_id": "string", "question_id": "string", "question_type": "string", "user_answer_text": "string", "_id": "string", "score": number }
    `;

    // === BƯỚC 2: Gọi service và kiểm tra kết quả ===
    const aiServiceResponse = await askGemini(fullPrompt);

    // Nếu service báo lỗi, trả về lỗi ngay lập tức
    if (!aiServiceResponse.status) {
      // aiServiceResponse đã có dạng { status: false, EC: -1, ... }
      return res.status(500).json(aiServiceResponse);
    }

    // Lấy dữ liệu thô (chuỗi) từ AI
    const rawDataFromAI = aiServiceResponse.data;

    // === BƯỚC 3: Parse và làm sạch dữ liệu từ AI ===
    // (Logic này vẫn cần thiết vì AI có thể trả về JSON trong khối Markdown)
    let parsedResult;
    try {
      const jsonMatch = rawDataFromAI.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : rawDataFromAI.trim();
      parsedResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Lỗi parse JSON từ Gemini:", parseError);
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Failed to parse response from AI",
        data: rawDataFromAI,
      });
    }
    return res.status(200).json({
      status: true,
      EC: 0,
      message: "Essays marked successfully",
      data: parsedResult,
    });
  } catch (err) {
    console.error("Lỗi không xác định trong handleGeminiMark:", err);
    res.status(500).json({
      status: false,
      EC: -1,
      message: "An unexpected error occurred in the controller",
      data: null,
    });
  }
};

module.exports = { handleGeminiMark };
