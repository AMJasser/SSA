const mongoose = require("mongoose");
const fs = require("fs");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    date: {
        type: Date,
        required: [true, "Please add a date"],
    },
    location: {
        type: String,
        required: [true, "Please add a location"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    photos: [
        {
            type: String,
            default: "no-img.png",
        },
    ],
    mainPhoto: {
        type: String,
        default: "no-img.png",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    attendees: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Member",
        },
    ],
});

EventSchema.pre("remove", function () {
    if (
        fs.existsSync("./public/uploads/" + this.mainPhoto) &&
        this.mainPhoto !== "no-img.png"
    ) {
        fs.unlinkSync("./public/uploads/" + this.mainPhoto);
    }

    this.photos.forEach(function(photo) {
        if (
            fs.existsSync("./public/uploads/" + photo) &&
            photo !== "no-img.png"
        ) {
            fs.unlinkSync("./public/uploads/" + photo);
        }
    });
});

EventSchema.methods.deletePhotos = function () {
    this.photos.forEach(function(photo) {
        if (
            fs.existsSync("./public/uploads/" + photo) &&
            photo !== "no-img.png"
        ) {
            fs.unlinkSync("./public/uploads/" + photo);
        }
    });
};

module.exports = mongoose.model("Event", EventSchema);
