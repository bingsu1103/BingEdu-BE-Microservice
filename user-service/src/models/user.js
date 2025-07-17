const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: true,
            default: "user"
        },
        type: {
            type: String,
            enum: ["normal", "vip"],
            required: true,
            default: "normal"
        },
        is_active: {
            type: Boolean,
            default: true
        },
        avatar: String,
    },
    {
        timestamps: true
    }
)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        await this.constructor.collection.dropIndexes();
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const User = mongoose.model('User', userSchema);
module.exports = User;