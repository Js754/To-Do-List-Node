const Mongoose = require("mongoose");

const checklistSchema = Mongoose.Schema({
    name: {type: String, required: true},
    tasks: 
    [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
});

module.exports = Mongoose.model("Checklist", checklistSchema);
