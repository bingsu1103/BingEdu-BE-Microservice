const axios = require("axios");
const validateAnswer = async (
  user_id,
  lesson_id,
  question_id,
  question_type,
  user_answer_key
) => {
  const urlUser = process.env.USER_SERVICE_URL;
  const urlQuestion = process.env.QUESTION_SERVICE_URL;
  const urlLesson = process.env.LESSON_SERVICE_URL;
  const resUser = await axios.get(`${urlUser}/id/${user_id}`);
  const user = resUser.data;
  if (!user) {
    return {
      status: false,
      EC: 1,
      message: "User not found",
      data: null,
    };
  }
  const resQuestion = await axios.get(`${urlQuestion}/id/${question_id}`);
  const question = resQuestion.data;
  if (!question) {
    return {
      status: false,
      EC: 1,
      message: "Question not found",
      data: null,
    };
  }
  const resLesson = await axios.get(`${urlLesson}/id/${lesson_id}`);
  const lesson = resLesson.data;
  if (!lesson) {
    return {
      status: false,
      EC: 1,
      message: "Lesson not found",
      data: null,
    };
  }

  if (question_type !== question.data.question_type) {
    return {
      status: false,
      EC: 1,
      message: "Question type not match",
      data: null,
    };
  }
  const isCorrect = question.data.correct_answer_key === user_answer_key;
  return {
    status: true,
    EC: 0,
    message: "Answer is valid",
    data: {
      isCorrect: isCorrect || false,
    },
  };
};

const validateMultipleAnswer = async (listAnswers) => {
  if (!Array.isArray(listAnswers) || listAnswers.length === 0) {
    return {
      status: false,
      EC: 1,
      message: "list Answer is not an array",
      data: null,
    };
  }

  const validLessons = listAnswers
    .map((l) => l.lesson_id)
    .filter((id) => id !== undefined && id !== null);
  const setLessons = new Set(validLessons);

  if (setLessons.size !== 1) {
    return {
      status: false,
      EC: 1,
      message: "Create multiple answer required the same lesson_id",
      data: null,
    };
  }

  const setQuestions = new Set(listAnswers.map((l) => l.question_id));
  const lessonId = listAnswers[0].lesson_id;

  if (setQuestions.size !== listAnswers.length) {
    return {
      status: false,
      EC: 1,
      message: "Duplicate question, please try again!",
      data: null,
    };
  }

  const url = `${process.env.LESSON_SERVICE_URL}/id/${lessonId}`;
  const lessonRes = await axios.get(url);
  const lesson = lessonRes.data.data;

  if (!lesson) {
    return {
      status: false,
      EC: 1,
      message: "Lesson not found",
      data: null,
    };
  }
  const typeList = new Set(listAnswers.map((l) => l.question_type));
  if (lesson.type !== "mixed") {
    if (typeList.size !== 1) {
      return {
        status: false,
        EC: 1,
        message:
          "Lesson type is not mixed but list answer contained mixed type",
        data: null,
      };
    }
  }
  const urlListQuestion = `${process.env.QUESTION_SERVICE_URL}/lesson/${lessonId}`;
  const listQuestionRes = await axios.get(urlListQuestion);
  const listQuestions = listQuestionRes.data.data;
  console.log(listQuestions);
  console.log(listAnswers);
  console.log(listQuestions.length);
  console.log(listAnswers.length);

  if (listQuestions.length !== listAnswers.length) {
    return {
      status: false,
      EC: 1,
      message:
        "Number of answer insert must be the same with question in lesson",
      data: null,
    };
  }
  const sortedQuestion = listQuestions.sort((a, b) =>
    a._id.localeCompare(b._id)
  );
  const sortedAnswer = listAnswers.sort((a, b) =>
    a.question_id.localeCompare(b.question_id)
  );

  for (let i = 0; i < sortedQuestion.length; i++) {
    if (sortedQuestion[i].question_type != sortedAnswer[i].question_type) {
      return {
        status: false,
        EC: 1,
        message: `A pair question and answer type is differ from the other:${sortedQuestion[i]._id}`,
        data: null,
      };
    }
    if (sortedAnswer[i].question_type === "multiple_choice") {
      sortedAnswer[i].is_correct =
        sortedQuestion[i].correct_answer_key === sortedAnswer[i].user_answer_key
          ? true
          : false;
      sortedAnswer[i].score = sortedAnswer[i].is_correct === true ? 1 : 0;
    }
  }

  return {
    status: true,
    EC: 0,
    message: "Validate successfully!",
    data: sortedAnswer,
  };
};
module.exports = { validateAnswer, validateMultipleAnswer };
