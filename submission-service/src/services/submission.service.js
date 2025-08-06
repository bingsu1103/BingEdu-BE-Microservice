const Submission = require("../models/submission");

const createSubmission = async (userId, lessonId, score) => {
  try {
    const newSubmission = new Submission({
      userId,
      lessonId,
      score,
    });
    await newSubmission.save();
    return {
      status: true,
      EC: 0,
      message: "Created submission successfully!",
      data: newSubmission,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Create submission failed",
      data: null,
    };
  }
};

const getAllSubmissions = async () => {
  try {
    const listSubmissions = await Submission.find({});
    return {
      status: true,
      EC: 0,
      message: "Fetched submission list successfully!",
      data: listSubmissions,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get all submissions failed",
      data: null,
    };
  }
};

const getSubmissionById = async (id) => {
  try {
    const submission = await Submission.findById(id);
    if (!submission) {
      return {
        status: false,
        EC: 1,
        message: "Submission not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Fetched submission successfully!",
      data: submission,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get submission failed",
      data: null,
    };
  }
};

const getSubmissionsByUserId = async (userId) => {
  try {
    const submissions = await Submission.find({ userId: userId });
    return {
      status: true,
      EC: 0,
      message: "Fetched submissions by user ID successfully!",
      data: submissions,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get submissions by user ID failed",
      data: null,
    };
  }
};

const getSubmissionsByLessonId = async (lessonId) => {
  try {
    const submissions = await Submission.find({ lessonId });
    return {
      status: true,
      EC: 0,
      message: "Fetched submissions by lesson ID successfully!",
      data: submissions,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get submissions by lesson ID failed",
      data: null,
    };
  }
};

const deleteSubmission = async (id) => {
  try {
    const result = await Submission.deleteById(id);
    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "Submission not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Deleted submission successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Delete submission failed",
      data: null,
    };
  }
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByUserId,
  getSubmissionsByLessonId,
  deleteSubmission,
};
