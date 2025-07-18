const Answer = require("../models/answer");
const utilValidate = require("../utils/validateAnswer");

const createAnswer = async (answer) => {
  try {
    const { user_id, lesson_id, question_id, question_type } = answer;
    let user_answer_key;
    let user_answer_text;
    if (question_type === "multiple_choice") {
      user_answer_key = answer.user_answer_key;
    } else {
      user_answer_text = answer.user_answer_text;
    }
    const finalData = { ...answer, user_answer_key, user_answer_text };
    const result = await utilValidate.validateAnswer(
      user_id,
      lesson_id,
      question_id,
      question_type,
      user_answer_key || null
    );
    if (!result.status) {
      return {
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      };
    }
    const newAnswer = await Answer.create(finalData);

    if (result.data.isCorrect) {
      const score = 1;
      newAnswer.score = score;
      newAnswer.is_correct = true;
      await newAnswer.save();
    } else {
      newAnswer.score = 0;
      newAnswer.is_correct = false;
      await newAnswer.save();
    }

    return {
      status: true,
      EC: 0,
      message: "Answer created successfully",
      data: newAnswer,
    };
  } catch (error) {
    return {
      status: false,
      EC: 1,
      message: error.message,
      data: null,
    };
  }
};

const createMultipleAnswer = async (listAnswers) => {
  try {
    const validateListAnswersRes = await utilValidate.validateMultipleAnswer(
      listAnswers
    );

    if (!validateListAnswersRes.status) {
      return {
        status: false,
        EC: 1,
        message: validateListAnswersRes.message,
        data: null,
      };
    }

    const answersData = validateListAnswersRes.data;
    const result = await Answer.insertMany(answersData);

    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "Create multiple answers failed",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create multiple answers successfully!",
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

const deleteMultipleAnswerByLessonId = async (id) => {
  try {
    const result = await Answer.deleteMany({ lesson_id: id });
    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "Delete List Answers By Lesson Id failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Delete List Answers By Lesson Id successfully!",
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

const getAnswersByLessonId = async (id) => {
  try {
    const listAnswers = await Answer.find({ lesson_id: id });
    if (listAnswers.length <= 0) {
      return {
        status: false,
        EC: 1,
        message: "No result found or invalid result",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get answers by lesson_id successfully!",
      data: listAnswers,
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
  createAnswer,
  createMultipleAnswer,
  deleteMultipleAnswerByLessonId,
  getAnswersByLessonId,
};
