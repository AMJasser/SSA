const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Event = require("../models/Event");

// @desc      Get events page
// @route     GET /events
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find();
    const pastEvents = [];
    const upcomingEvents = [];
    const now = new Date();

    events.forEach(function(event) {
        if (event.date < now) {
            pastEvents.push(event);
        } else {
            upcomingEvents.push(event);
        }
    });

    viewResponse(req, res, next, "events", { pastEvents, upcomingEvents });
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

// @desc      Delete Event
// @route     DELETE /events/:id
// @access    Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found`)
        );
    }

    event.remove();

    res.status(201).redirect("/manage");
});