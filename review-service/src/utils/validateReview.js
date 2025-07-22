const axios = require("axios");
const validateReview = async (userID, lessonID) => {
  const urlUser = `${process.env.USER_SERVICE_URL}/id/${userID}`;
  const userRes = await axios.get(urlUser);
  const user = userRes.data.data;
  if (!user)
    return {
      status: false,
      EC: 1,
      message: "User not founded",
      data: null,
    };

  const urlLesson = `${process.env.LESSON_SERVICE_URL}/id/${lessonID}`;
  const lessonRes = await axios.get(urlLesson);
  const lesson = lessonRes.data.data;
  if (!lesson) {
    return {
      status: false,
      EC: 1,
      message: "Lesson not found",
      data: null,
    };
  }
  return {
    status: true,
    EC: 0,
    message: "Validate successfully!",
    data: null,
  };
};

module.exports = validateReview;
