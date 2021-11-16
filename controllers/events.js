const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Event = require("../models/Event");

// @desc      Get events page
// @route     GET /events
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, "events");
});

// @desc      Create new event
// @route     POST /events
// @access    Private/admin
exports.createEvent = asyncHandler(async (req, res, next) => {
    req.body.mainPhoto = req.files.mainPhoto[0].filename;
    req.body.photos = [];

    req.files.photo.forEach(function(file) {
        console.log(file.filename);
        req.body.photos.push(file.filename);
    });

    await Event.create(req.body);

    res.status(201).redirect("/");
});