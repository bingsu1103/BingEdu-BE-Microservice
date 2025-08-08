const Question = require("../models/question");
const axios = require("axios");
const validateQuestion = require("../utils/validateQuestion.util");

const createQuestion = async (question) => {
  try {
    const { id, level } = question.lesson;
    const url = `${process.env.LESSON_SERVICE_URL}/id/${id}`;
    const lessonResponse = await axios.get(url);

    const result = lessonResponse.data;
    if (!result.status) {
      return {
        status: false,
        EC: 1,
        message: "Lesson not exit in system",
        data: null,
      };
    }
    if (
      id !== result.data._id ||
      level !== result.data.level ||
      (question.question_type === "multiple_choice" &&
        result.data.type === "essay") ||
      (question.question_type === "essay" &&
        result.data.type === "multiple_choice")
    ) {
      return {
        status: false,
        EC: 1,
        message: "Lesson id, level must be same with the one in system",
        data: null,
      };
    }
    const newQuestion = await Question.create(question);
    if (!newQuestion) {
      return {
        status: false,
        EC: 1,
        message: "Create new question failed",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create new question successfully!",
      data: newQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const createMultipleQuestion = async (listQuestions) => {
  try {
    const url = `${process.env.LESSON_SERVICE_URL}/multiple`;
    const { validQuestions, invalidQuestions } = await validateQuestion(
      listQuestions || [],
      url
    );
    let questionIds = [];

    if (invalidQuestions.length === listQuestions.length) {
      return {
        status: false,
        EC: 1,
        message: "Create list question failed",
        data: { validQuestions, invalidQuestions, questionIds },
      };
    }

    if (validQuestions.length > 0) {
      const result = await Question.insertMany(validQuestions, {
        ordered: false,
      });
      questionIds = result.map((q) => q._id);
    }

    return {
      status: true,
      EC: 0,
      message:
        invalidQuestions.length > 0
          ? "Some questions failed to create"
          : "Questions created successfully",
      data: { validQuestions, invalidQuestions, questionIds },
    };
  } catch (error) {
    console.error("Create multiple questions error:", error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const updateQuestion = async (id, updateData) => {
  try {
    const question = await Question.findById(id);
    if (!question) {
      return {
        status: false,
        EC: 1,
        message: "Question not exits in system",
        data: null,
      };
    }
    const updateQuestion = await Question.updateOne({ _id: id }, updateData);
    return {
      status: true,
      EC: 0,
      message: "Update question successfully!",
      data: updateQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const getQuestion = async (id) => {
  try {
    const question = await Question.findById(id);
    if (!question) {
      return {
        status: false,
        EC: 1,
        message: "Question not exits in system",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get question successfully!",
      data: question,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const getAllQuestion = async () => {
  try {
    const listQuestion = await Question.find({});
    if (!listQuestion) {
      return {
        status: false,
        EC: 1,
        message: "Empty or not exits in system!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get list question succesfully!",
      data: listQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};
const getQuestionByLessonId = async (id) => {
  try {
    const url = `${process.env.LESSON_SERVICE_URL}/id/${id}`;
    const lesson = await axios.get(url);
    if (!lesson.data.status) {
      return {
        status: false,
        EC: 1,
        message: "Lesson not exits in system",
        data: null,
      };
    }
    const listQuestion = await Question.find({ "lesson.id": id }).select(
      "-correct_answer_key -explanation"
    );
    if (!listQuestion) {
      return {
        status: false,
        EC: 1,
        message: "Lesson maybe empty",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get question by id successfully!",
      data: listQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const getQuestionByLessonIdWithAnswer = async (id) => {
  try {
    const url = `${process.env.LESSON_SERVICE_URL}/id/${id}`;
    const lesson = await axios.get(url);
    if (!lesson.data.status) {
      return {
        status: false,
        EC: 1,
        message: "Lesson not exits in system",
        data: null,
      };
    }
    const listQuestion = await Question.find({ "lesson.id": id });
    if (!listQuestion) {
      return {
        status: false,
        EC: 1,
        message: "Lesson maybe empty",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get question by id successfully!",
      data: listQuestion,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};

const deleteQuestion = async (id) => {
  try {
    const result = await Question.deleteOne({ _id: id });
    if (!result) {
      return {
        status: false,
        EC: -1,
        message: "Delete question failed",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Delete question successfully!",
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};
module.exports = {
  createQuestion,
  createMultipleQuestion,
  updateQuestion,
  getAllQuestion,
  getQuestion,
  getQuestionByLessonId,
  deleteQuestion,
  getQuestionByLessonIdWithAnswer,
};
