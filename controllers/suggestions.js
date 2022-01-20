const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Suggestion = require("../models/Suggestion");

// @desc      Get suggestions page
// @route     GET /suggestions
// @access    Public
exports.getSuggestions = asyncHandler(async (req, res, next) => {
    let suggestions = await Suggestion.find();

    if (req.user._id) {
        suggestions.forEach(function(suggestion) {
            for (const upvoter of suggestion.upvoters) {
                if (upvoter._id.toString === req.user._id.toString) {
                    suggestion.userupvoted = true;
                }
            }
            
            for (const downvoter of suggestion.downvoters) {
                if (downvoter._id.toString === req.user._id.toString) {
                    suggestion.userdownvoted = true;
                }
            }
        })
    }

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

// @desc    Upvote Suggestion
// @route   GET /suggestions/:id/upvote
// @access  Private
exports.upvote = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findById(req.params.id);

    if (!suggestion) {
        return next(
            new ErrorResponse(`Suggestion not found`)
        );
    }

    for (var i = 0; i < suggestion.upvoters.length; i++) {
        if (suggestion.upvoters[i]._id.toString === req.user._id.toString) {
            suggestion.upvoters.splice(i, 1);
            suggestion.votes -= 1;

            suggestion.save();

            return res.status(201).redirect("/suggestions");
        }
    }

    suggestion.upvoters.push(req.user);
    suggestion.votes += 1;

    suggestion.save();

    res.status(201).redirect("/suggestions");
});

// @desc    Downvote Suggestion
// @route   GET /suggestions/:id/downvote
// @access  Private
exports.downvote = asyncHandler(async (req, res, next) => {
    const suggestion = await Suggestion.findById(req.params.id);

    if (!suggestion) {
        return next(
            new ErrorResponse(`Suggestion not found`)
        );
    }

    for (var i = 0; i < suggestion.downvoters.length; i++) {
        if (suggestion.downvoters[i]._id.toString === req.user._id.toString) {
            suggestion.downvoters.splice(i, 1);
            suggestion.votes += 1;

            suggestion.save();

            return res.status(201).redirect("/suggestions");
        }
    }

    suggestion.downvoters.push(req.user);
    suggestion.votes -= 1;

    suggestion.save();

    res.status(201).redirect("/suggestions");
});