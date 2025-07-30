const LessonProgress = require("../models/lessonProgress");
const createLessonProgress = async (data) => {
  try {
    const newData = { ...data, completed: true };
    const lessonProgress = await LessonProgress.create(newData);
    if (!lessonProgress) {
      return {
        status: false,
        EC: 1,
        message: "Create complete lesson failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create complete lesson successfully!",
      data: lessonProgress,
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

const getLessonProgress = async (userId, lessonId) => {
  try {
    const lessonProgress = await LessonProgress.findOne({
      userId: userId,
      lessonId: lessonId,
    });
    if (!lessonProgress) {
      return {
        status: false,
        EC: 1,
        message: "Error to find one completed lesson of user",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get lesson completed successfully!",
      data: lessonProgress,
    };
  } catch (error) {
    console.log();
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};
module.exports = { createLessonProgress, getLessonProgress };
