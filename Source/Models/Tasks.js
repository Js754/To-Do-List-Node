const Mongoose = require("mongoose");

const taskSchema = Mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    Checklist:
    {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
});

module.exports = Mongoose.model("Task", taskSchema);
