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

// @desc      Get team page
// @route     GET /team
// @access    Public
exports.getTeam = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "team");
});

// @desc      Get board application page
// @route     GET /board
// @access    Public
exports.getBoard = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "boardApp");
});

// @desc      Get manage page
// @route     GET /about
// @access    Private/admin
exports.getManage = asyncHandler(async (req, res, next) => {
    const members = await Member.find();
    const events = await Event.find();
    const contacts = await Contact.find();

    viewResponse(req, res, next, "manage", { members, events, contacts });
});
