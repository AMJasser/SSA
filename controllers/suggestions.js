const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Suggestion = require("../models/Suggestion");

// @desc      Get suggestions page
// @route     GET /suggestions
// @access    Public
exports.getSuggestions = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "suggestions");
});

// @desc      Create suggestions
// @route     POST /suggestions
// @access    Public
exports.createSuggestion = asyncHandler(async (req, res, next) => {
    await Suggestion.create(req.body);

    res.status(201).redirect("/");
});