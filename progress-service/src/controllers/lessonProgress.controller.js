const lessonProgressService = require("../services/lessonProgress.service");

const createLessonProgressAPI = async (req, res) => {
  try {
    const lessonProgress = await lessonProgressService.createLessonProgress(
      req.body
    );
    if (!lessonProgress.status) {
      return res.status(401).json({
        status: false,
        EC: 1,
        message: lessonProgress.message,
        data: null,
      });
    }
    return res.status(200).json(lessonProgress);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getLessonProgressAPI = async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    const lessonProgress = await lessonProgressService.getLessonProgress(
      userId,
      lessonId
    );
    if (!lessonProgress.status) {
      return res.status(401).json({
        status: false,
        EC: 1,
        message: lessonProgress.message,
        data: null,
      });
    }
    return res.status(200).json(lessonProgress);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
module.exports = { createLessonProgressAPI, getLessonProgressAPI };
