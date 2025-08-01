const coursesProgressService = require("../services/coursesProgress.service");
const createCourseProgressAPI = async (req, res) => {
  try {
    const data = req.body;
    const coursesProgress = await coursesProgressService.createCourseProgress(
      data
    );
    if (!coursesProgress.status) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Create courses progress failed!",
        data: null,
      });
    }
    return res.status(200).json(coursesProgress);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
const updateCourseProgressAPI = async (req, res) => {
  try {
    const { userId, lessonId, coursesId } = req.body;
    const coursesProgress = await coursesProgressService.updateCourseProgress(
      userId,
      lessonId,
      coursesId
    );
    if (!coursesProgress.status) {
      return res.status(400).json({
        status: false,
        EC: -1,
        message: "Update courses progress failed",
        data: null,
      });
    }
    return res.status(500).json(coursesProgress);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
const getCoursesProgressAPI = async (req, res) => {
  try {
    const { userId, coursesId } = req.body;
    if (!coursesId || !userId) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing coursesId || userId",
        data: null,
      });
    }
    const courseProgress = await coursesProgressService.getCoursesProgress(
      coursesId,
      userId
    );
    if (!courseProgress.status) {
      return res.status(500).json(courseProgress);
    }
    return res.status(200).json(courseProgress);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
module.exports = {
  createCourseProgressAPI,
  getCoursesProgressAPI,
  updateCourseProgressAPI,
};
