const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel');

/*
Ассистент (Assistant)
Старший преподаватель (Senior Lecturer)
Доцент (Associate Professor)
Профессор (Professor)
Заведующий кафедрой (Head of Department)
*/

const modSchema = new Schema({
    faculty: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        enum: ["Ассистент", "Старший преподаватель", "Доцент", "Профессор", "Заведующий кафедрой"],
        trim: true,
        required: true,
    },
    verifiedByAdmin: {
        type: Boolean,
        default: false,
    },
});

const Mod = User.discriminator('Mod', modSchema);

module.exports = Mod;
