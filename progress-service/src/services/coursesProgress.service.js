const CoursesProgress = require("../models/coursesProgress");
const axios = require("axios");

const createCourseProgress = async (data) => {
  try {
    const coursesProgress = await CoursesProgress.create(data);
    if (!coursesProgress) {
      return {
        status: false,
        EC: 1,
        message: "Create courses progress failed!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create course progress success!",
      data: coursesProgress,
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

const updateCourseProgress = async (userId, lessonId) => {
  try {
    const courses = await CoursesProgress.findOne({ userId: userId });
    if (courses.completed) {
      return {
        status: false,
        EC: 1,
        message: "courses completed",
        data: null,
      };
    }
    courses.push(lessonId);
    await courses.save();
    const listCoursesRes = await axios.get(
      `${process.env.COURSES_SERVICE_URL}/multiple`
    );
    const listCoursesLength = listCoursesRes.data.data.length;
    if (courses.length === listCoursesLength) {
      courses.completed = true;
      await courses.save();
    }
    return {
      status: true,
      EC: 0,
      message: "Update courses progress successfully!",
      data: courses,
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

const getCoursesProgress = async (coursesId) => {
  try {
    const coursesProgress = await CoursesProgress.findById(id);
    if (!courses) {
      return {
        status: false,
        EC: 1,
        message: "not founded courses",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "get courses progress successfully!",
      data: coursesProgress,
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
  createCourseProgress,
  updateCourseProgress,
  getCoursesProgress,
};
