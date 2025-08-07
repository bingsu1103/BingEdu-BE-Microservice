const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  lesson: {
    id: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
  question_type: {
    type: String,
    enum: ["multiple_choice", "essay"],
    required: true,
  },
  question_text: {
    type: String,
    required: true,
  },
  imageUrl: String,
  audioUrl: String,
  options: {
    type: Map,
    of: String,
    validate: {
      validator: function (val) {
        if (this.question_type !== "multiple_choice") return true;

        const validKeys = ["A", "B", "C", "D"];
        const keys = Array.from(val?.keys?.() || []);
        return keys.length === 4 && keys.every((k) => validKeys.includes(k));
      },
      message: "Options must have exactly 4 keys: A, B, C, D",
    },
  },
  correct_answer_key: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: function () {
      return this.question_type === "multiple_choice";
    },
  },
  explanation: {
    type: String,
  },
});
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
