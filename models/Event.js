const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    date: {
        type: Date,
        required: [true, "Please add a date"] 
    },
    location: {
        type: String,
        required: [true, "Please add a location"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"]
    },
    photos: [{
        type: String,
        default: "no-img.png"
    }]
});

module.exports = mongoose.model('Event', EventSchema);