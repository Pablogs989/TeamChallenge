const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    tasksId: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ],
})
const User = mongoose.model('User', UserSchema);

module.exports = User;