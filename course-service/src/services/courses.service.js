const Courses = require("../models/courses");

const createCourse = async (course) => {
    try {
        const newCourse = await Courses.create(course);
        return {
            status: true,
            EC: 0,
            message: "Create course successfully!",
            data: newCourse
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            EC: -1,
            message: error.message || "Create course failed! (SERVER)",
            data: null
        }
    }
}
const updateCourse = async (id, updateData) => {
    try {
        const updateCourse = await Courses.updateOne({ _id: id }, updateData);
        return {
            status: true,
            EC: 0,
            message: "Update course successfully!",
            data: updateCourse
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            EC: -1,
            message: error.message || "Update course failed (SERVER)!",
            data: null
        }
    }
}
const getCourse = async (id) => {
    try {
        const course = await Courses.findById(id);
        if (!course) {
            return {
                status: false,
                EC: 1,
                message: "Course not exits in system",
                data: null
            }
        }
        return {
            status: true,
            EC: 0,
            message: "Get course successfully!",
            data: course,
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            EC: -1,
            message: error.message || "Get course failed (SERVER)!",
            data: null
        }
    }
}
const deleteCourse = async (id) => {
    try {
        const course = await Courses.deleteOne({ _id: id });
        return {
            status: true,
            EC: 0,
            message: "Delete course successfully!",
            data: course,
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            EC: -1,
            message: error.message || "Delete course failed (SERVER)!",
            data: null
        }
    }
}
const getAllCourse = async () => {
    try {
        const listCourse = await Courses.find({});
        return {
            status: true,
            EC: 0,
            message: "Get list courses successfully!",
            data: listCourse,
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            EC: -1,
            message: error.message || "Get list course failed (SERVER)!",
            data: null
        }
    }
}
module.exports = { createCourse, updateCourse, getCourse, deleteCourse, getAllCourse }