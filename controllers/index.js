const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Member = require("../models/Member");
const Event = require("../models/Event");
const Contact = require("../models/Contact");

// @desc      Get index page
// @route     GET /
// @access    Public
exports.getIndex = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "index");
});

// @desc      Get about page
// @route     GET /about
// @access    Public
exports.getAbout = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "about");
});

// @desc      Get manage page
// @route     GET /about
// @access    Private/admin
exports.getManage = asyncHandler(async (req, res, next) => {
    const members = await Member.find();
    let events;
    const contacts = await Contact.find();

    if (req.query.sortDate) {
        events = await Event.find().sort(req.query.sortDate === "nearest" ? "date" : "-date")
    } else if (req.query.sortCreated) {
        events = await Event.find().sort(req.query.sortCreated === "nearest" ? "createdAt" : "-createdAt");
    } else {
        events = await Event.find();
    }

    viewResponse(req, res, next, "manage", { members, events, contacts });
});