const mongoose = require("mongoose");

const lessonProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    completed: Boolean,
  },
  {
    timestamps: true,
  }
);

const LessonProgress = mongoose.model("LessonProgress", lessonProgressSchema);
module.exports = LessonProgress;
