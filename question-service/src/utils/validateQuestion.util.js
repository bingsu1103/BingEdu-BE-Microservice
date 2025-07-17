const axios = require("axios");
const validateQuestion = async (listQuestions, url) => {
    if (!Array.isArray(listQuestions) || listQuestions.length === 0) {
        return { validQuestions: [], invalidQuestions: [], error: "Invalid or empty list of questions" };
    }

    const lessonResponse = await axios.get(url);
    const lessons = lessonResponse.data.data || [];

    const validLessons = new Map(lessons.map(l => [l._id.toString(), l]));

    const validQuestions = [];
    const invalidQuestions = [];

    listQuestions.forEach(q => {
        const lessonId = q.lesson.id.toString();
        const lesson = validLessons.get(lessonId);

        if (!lesson) {
            invalidQuestions.push(q);
        } else if (q.lesson.level !== lesson.level) {
            invalidQuestions.push(q);
        } else {
            if (lesson.type === "mixed") {
                validQuestions.push(q);
            } else {
                if (q.question_type !== lesson.type) {
                    invalidQuestions.push(q);
                } else {
                    validQuestions.push(q);
                }
            }
        }
    });
    return { validQuestions, invalidQuestions };
}
module.exports = validateQuestion