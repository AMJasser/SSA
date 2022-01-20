const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    suggestion: {
        type: String,
        required: [true, "Please add a message"],
    },
    votes: {
        type: Number,
        default: 0,
        voters: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Member",
            },
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Suggestion", SuggestionSchema);