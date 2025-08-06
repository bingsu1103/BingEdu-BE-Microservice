const submissionService = require("../services/submission.service");

const createSubmissionAPI = async (req, res) => {
  try {
    const { userId, lessonId, score } = req.body;
    const result = await submissionService.createSubmission(
      userId,
      lessonId,
      score
    );
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to create submission",
      data: null,
    });
  }
};

const getAllSubmissionsAPI = async (req, res) => {
  try {
    const listSubmissions = await submissionService.getAllSubmissions();
    return res.status(200).json(listSubmissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get all submissions",
      data: null,
    });
  }
};

const getSubmissionByIdAPI = async (req, res) => {
  try {
    const submission = await submissionService.getSubmissionById(req.params.id);
    return res.status(200).json(submission);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get submission",
      data: null,
    });
  }
};

const getSubmissionsByUserIdAPI = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await submissionService.getSubmissionsByUserId(userId);
    return res.status(200).json(submissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get submissions by user ID",
      data: null,
    });
  }
};

const getSubmissionsByLessonIdAPI = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const submissions = await submissionService.getSubmissionsByLessonId(
      lessonId
    );
    return res.status(200).json(submissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get submissions by lesson ID",
      data: null,
    });
  }
};

const deleteSubmissionAPI = async (req, res) => {
  try {
    const submission = await submissionService.deleteSubmission(req.params.id);
    return res.status(200).json(submission);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to delete submission",
      data: null,
    });
  }
};

module.exports = {
  createSubmissionAPI,
  getAllSubmissionsAPI,
  getSubmissionByIdAPI,
  getSubmissionsByUserIdAPI,
  getSubmissionsByLessonIdAPI,
  deleteSubmissionAPI,
};
