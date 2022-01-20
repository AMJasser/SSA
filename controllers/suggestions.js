const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Suggestion = require("../models/Suggestion");

// @desc      Get suggestions page
// @route     GET /suggestions
// @access    Public
exports.getSuggestions = asyncHandler(async (req, res, next) => {
    const suggestions = await Suggestion.find();

    viewResponse(req, res, next, "suggestions", { suggestions });
});

// @desc      Create suggestions
// @route     POST /suggestions
// @access    Public
exports.createSuggestion = asyncHandler(async (req, res, next) => {
    await Suggestion.create(req.body);

    res.status(201).redirect("/suggestions");
});

// @desc      Delete Suggestion
// @route     DELETE /suggestions/:id
// @access    Private
exports.deleteSuggestion = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findById(req.params.id);

    if (!suggestion) {
        return next(
            new ErrorResponse(`Suggestion not found`)
        );
    }

    suggestion.remove();

    res.status(201).redirect("/manage");
});