const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["multiple_choice", "essay", "mixed"],
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  time: {
    type: Number,
    required: true,
    default: 30,
  },
  courses: {
    id: String,
    type: {
      type: String,
      enum: ["listening", "reading", "writing", "grammar", "mixed"],
    },
  },
});
const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
