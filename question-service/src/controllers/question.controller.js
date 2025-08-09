const questionService = require("../services/question.service");

const createQuestionAPI = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing data",
        data: null,
      });
    }

    const newQuestion = await questionService.createQuestion(data);

    if (!newQuestion) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Create question failed",
        data: null,
      });
    }

    return res.status(201).json(newQuestion);
  } catch (error) {
    console.error("createQuestionAPI error:", error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Create question failed",
      data: null,
    });
  }
};

const createMultipleQuestionAPI = async (req, res) => {
  try {
    const listQuestion = req.body;
    const result = await questionService.createMultipleQuestion(listQuestion);
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const updateQuestionAPI = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await questionService.updateQuestion(id, updateData);
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Update question failed",
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getQuestionAPI = async (req, res) => {
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
    const result = await questionService.getQuestion(id);
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Get question failed",
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getAllQuestionAPI = async (req, res) => {
  try {
    const result = await questionService.getAllQuestion();
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Get list question failed",
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getQuestionByLessonIdAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing lesson id",
        data: null,
      });
    }
    const result = await questionService.getQuestionByLessonId(id);
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Get list question failed",
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getQuestionByLessonIdWithAnswerAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing lesson id",
        data: null,
      });
    }
    const result = await questionService.getQuestionByLessonIdWithAnswer(id);
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Get list question failed",
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const deleteQuestionAPI = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing lesson id",
        data: null,
      });
    }
    const result = await questionService.deleteQuestion(id);
    if (!result) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Delete question failed",
        data: null,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

module.exports = {
  createQuestionAPI,
  createMultipleQuestionAPI,
  updateQuestionAPI,
  getQuestionAPI,
  getAllQuestionAPI,
  deleteQuestionAPI,
  getQuestionByLessonIdAPI,
  getQuestionByLessonIdWithAnswerAPI,
};
