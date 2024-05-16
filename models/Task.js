const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    body: {
        type: String,
        required: [true, "Please enter a body"]
    },
    date: {
        type: Date,
        required: [true, "Please enter a date"]
    },
    UserId: {
        type: ObjectId,
        ref: "User"
    },
})

module.exports = Task;