const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    score: Number,
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
