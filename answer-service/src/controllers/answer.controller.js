const answerService = require("../services/answer.service");
const createAnswerAPI = async (req, res) => {
  try {
    const answer = req.body;
    const result = await answerService.createAnswer(answer);
    return res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 1,
      message: error.message,
    });
  }
};
const createMultipleAnswerAPI = async (req, res) => {
  try {
    const listAnswers = req.body;
    if (!listAnswers) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing data",
        data: null,
      });
    }
    const result = await answerService.createMultipleAnswer(listAnswers);
    if (!result.status) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
const deleteMultipleAnswerByLessonIdAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await answerService.deleteMultipleAnswerByLessonId(id);
    if (!result.status) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
const getAnswersByLessonIdAPI = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await answerService.getAnswersByLessonId(id, userId);
    if (!result.status) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
module.exports = {
  createAnswerAPI,
  createMultipleAnswerAPI,
  deleteMultipleAnswerByLessonIdAPI,
  getAnswersByLessonIdAPI,
};
