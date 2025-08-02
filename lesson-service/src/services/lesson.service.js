const Lesson = require("../models/lesson");
const axios = require("axios");

const createLesson = async (lesson) => {
  try {
    const url = `${process.env.COURSES_SERVICE_URL}/id/${lesson.courses.id}`;
    const coursesResponse = await axios.get(url);
    const result = coursesResponse.data;

    if (!result.status) {
      return {
        status: false,
        EC: 1,
        message: "Courses not exist in system to create lesson",
        data: null,
      };
    }
    if (
      lesson.courses.id !== result.data._id ||
      lesson.courses.type !== result.data.type
    ) {
      return {
        status: false,
        EC: 1,
        message:
          "Course id and courses type must be same with the one that in system",
      };
    }
    const newLesson = await Lesson.create(lesson);

    if (!newLesson) {
      return {
        status: false,
        EC: 1,
        message: "Create lesson failed (maybe missing data)!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Create lesson successfully!",
      data: newLesson,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Create lesson failed (ERROR FROM SERVER)!",
      data: null,
    };
  }
};

const updateLesson = async (id, updateData) => {
  try {
    const lesson = await Lesson.updateOne({ _id: id }, updateData);
    if (!lesson) {
      return {
        status: false,
        EC: 1,
        message: "Update lesson failed",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Update lesson successfully!",
      data: lesson,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Update lesson failed due to server!",
      data: null,
    };
  }
};

const getLesson = async (id) => {
  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return {
        status: false,
        EC: 1,
        message: "Lesson not exits in system",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get lesson successfully!",
      data: lesson,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Get lesson failed due to server!",
      data: null,
    };
  }
};
const getAllLesson = async () => {
  try {
    const listLessons = await Lesson.find({});
    if (!listLessons) {
      return {
        status: false,
        EC: 1,
        message: "Error founded lesson",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get list lessons successfully!",
      data: listLessons,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Get list lessons failed due to server!",
      data: null,
    };
  }
};

const getLessonByCourseId = async (id) => {
  try {
    const url = `${process.env.COURSES_SERVICE_URL}/id/${id}`;
    const courses = await axios.get(url);
    if (!courses.data.status) {
      return {
        status: false,
        EC: 1,
        message: "Courses not found in system",
        data: null,
      };
    }
    const listLesson = await Lesson.find({ "courses.id": id });
    return {
      status: true,
      EC: 0,
      message: "Get lesson by courses id successfully!",
      data: listLesson,
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
const deleteLesson = async (id) => {
  try {
    const lesson = await Lesson.deleteOne({ _id: id });
    if (!lesson) {
      return {
        status: false,
        EC: 1,
        message: "Error delete lesson (maybe missing id)!",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Delete lesson successfully!",
      data: lesson,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Delete lesson failed",
      data: null,
    };
  }
};
module.exports = {
  createLesson,
  updateLesson,
  getLesson,
  getAllLesson,
  getLessonByCourseId,
  deleteLesson,
};
