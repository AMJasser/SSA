const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Event = require("../models/Event");

// @desc      Get events page
// @route     GET /events
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find().populate("attendees");
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

// @desc      Add user to event attendees
// @route     POST /events/:id/rsvp
// @access    Private/Any
exports.rsvp = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    event.attendees.push(req.user._id);

    event.save();

    res.status(200).redirect("/events");
});

// @desc      remove user from event attendees
// @route     POST /events/:id/dersvp
// @access    Private/Any
exports.dersvp = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id).populate("attendees");

    for (var i = 0; i < event.attendees.length; i++) {
        if (event.attendees[i]._id.toString() === req.user._id.toString()) {
            event.attendees.splice(i, 1);
        }
    }

    event.save();

    res.status(200).redirect("/events");
});

// @desc      Create new event
// @route     POST /events
// @access    Private/admin
exports.createEvent = asyncHandler(async (req, res, next) => {
    req.body.mainPhoto = req.files.mainPhoto[0].filename;

    if (req.files.photo) {
        req.body.photos = [];
        req.files.photo.forEach(function(file) {
            console.log(file.filename);
            req.body.photos.push(file.filename);
        });
    }

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

// @desc      Get page edit page
// @route     GET /events/:id/edit
// @access    Private
exports.getEditEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found`)
        );
    }

    viewResponse(req, res, next, "editEvent", { event });
});

// @desc      Edit event
// @route     PUT /events/:id
// @access    Private
exports.editEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found`)
        );
    }

    const changeMainPhoto = req.body.changeMainPhoto;
    const changePhotos = req.body.changePhotos;

    delete req.body.changeMainPhoto;
    delete req.body.changePhotos;

    if (changeMainPhoto === "yes") {
        req.body.mainPhoto = req.files.mainPhoto[0].filename;
    }

    if (changePhotos === "yes") {
        event.deletePhotos();
        req.body.photos = [];

        req.files.photo.forEach(function(photo) {
            req.body.photos.push(photo.filename);
        });
    }

    Object.keys(req.body).forEach(function(key) {
        event[key] = req.body[key];
    });

    event.save();

    res.status(200).redirect("/");
});