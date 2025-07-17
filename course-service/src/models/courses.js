const mongoose = require("mongoose");
const coursesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["listening", "reading", "grammar", "writing", "mixed"],
            required: true,
        }
    }
)

const Courses = mongoose.model('Courses', coursesSchema);
module.exports = Courses;