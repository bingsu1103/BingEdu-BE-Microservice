const courseService = require("../services/courses.service")

const createCourseAPI = async (req, res) => {
    try {
        const data = req.body;
        const course = await courseService.createCourse(data);
        if (!course) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Maybe missing data",
                data: null
            })
        }
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "Error from server!",
            data: null
        })
    }
}

const updateCourseAPI = async (req, res) => {
    try {
        const { id, ...data } = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing id",
                data: null
            })
        }
        const course = await courseService.updateCourse(id, data);
        if (!course) {
            return res.status(500).json({
                status: false,
                EC: 1,
                message: "Update course failed",
                data: null
            })
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "Error from server!",
            data: null,
        })
    }
}

const getCourseAPI = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing id",
                data: null
            })
        }
        const course = await courseService.getCourse(id);
        if (!course) {
            return res.status(500).json({
                status: false,
                EC: 1,
                message: "Get course failed",
                data: null
            })
        }
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: "Error from server!",
            data: null
        })
    }
}
const deleteCourseAPI = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing id",
                data: null
            })
        }
        const course = await courseService.deleteCourse(id);
        if (!course) {
            return res.status(500).json({
                status: false,
                EC: 1,
                message: "Delete course failed",
                data: null
            })
        }
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null,
        })
    }
}
const getAllCoursesAPI = async (req, res) => {
    try {
        const listCourses = await courseService.getAllCourse();
        if (!listCourses) {
            return res.status(500).json({
                status: false,
                EC: 1,
                message: "Get list courses failed",
                data: null
            })
        }
        return res.status(200).json(listCourses);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null
        })
    }
}
module.exports = { createCourseAPI, updateCourseAPI, deleteCourseAPI, getAllCoursesAPI, getCourseAPI }