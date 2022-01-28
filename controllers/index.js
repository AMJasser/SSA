const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Member = require("../models/Member");
const Event = require("../models/Event");
const Contact = require("../models/Contact");
const Suggestion = require("../models/Suggestion");

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
    const events = await Event.find();
    const contacts = await Contact.find();
    const suggestions = await Suggestion.find();

    viewResponse(req, res, next, "manage", { members, events, contacts, suggestions });
});