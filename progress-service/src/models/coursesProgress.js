const mongoose = require("mongoose");

const coursesProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    coursesId: {
      type: String,
      required: true,
    },
    lessonsIdComplete: [
      {
        type: String,
        required: true,
      },
    ],
    progress: Number,
    completed: Boolean,
  },
  {
    timestamps: true,
  }
);

const CoursesProgress = mongoose.model(
  "CoursesProgress",
  coursesProgressSchema
);
module.exports = CoursesProgress;
