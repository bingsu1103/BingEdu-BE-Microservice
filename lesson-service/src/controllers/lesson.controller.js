const lessonService = require("../services/lesson.service");

const createLessonAPI = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing data",
                data: null
            })
        }
        const lesson = await lessonService.createLesson(data);
        return res.status(201).json(lesson);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null
        })
    }
}

const updateLessonAPI = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing id",
                data: null,
            })
        }
        const lesson = await lessonService.updateLesson(id, updateData);
        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null
        })
    }
}
const getLessonAPI = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: "Missing id",
                data: null,
            })
        }
        const lesson = await lessonService.getLesson(id);
        return res.status(200).json(lesson);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null,
        })
    }
}

const getAllLessonAPI = async (req, res) => {
    try {
        const listLessons = await lessonService.getAllLesson();
        return res.status(200).json(listLessons);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null
        })
    }
}

const deleteLessonAPI = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                status: false,
                EC: 1,
                message: 'Missing id',
                data: null,
            })
        }
        const result = await lessonService.deleteLesson(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: false,
            EC: -1,
            message: error.message || "ERROR FROM SERVER!",
            data: null,
        })
    }
}

module.exports = { createLessonAPI, updateLessonAPI, deleteLessonAPI, getLessonAPI, getAllLessonAPI }