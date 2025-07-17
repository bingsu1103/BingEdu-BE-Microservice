const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  lesson_id: {
    type: String,
    required: true,
  },
  question_id: {
    type: String,
    required: true,
  },
  question_type: {
    type: String,
    enum: ["multiple_choice", "essay"],
    required: true,
  },
  user_answer_key: {
    type: String,
    enum: ["A", "B", "C", "D"],
  },
  user_answer_text: String,
  is_correct: Boolean,
  score: Number,
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
