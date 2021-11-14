const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Member = require("../models/Member");

// @desc      Get membership page
// @route     GET /members
// @access    Public
exports.getMembership = asyncHandler(async (req, res, next) => {
    res.status(200).render("membership", (err, html) => {
        if (err) {
            return next(new ErrorResponse("Problem Rendering", 500));
        } else {
            res.send(html);
        }
    });
});

// @desc      Create member
// @route     POST /members
// @access    Public
exports.createMember = asyncHandler(async (req, res, next) => {
    const member = await Member.create(req.body);

    res.status(201).redirect("/");
});