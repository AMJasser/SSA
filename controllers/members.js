const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Member = require("../models/Member");

// @desc      Get membership page
// @route     GET /members
// @access    Public
exports.getMembership = asyncHandler(async (req, res, next) => {
    res.status(200).render("membership", { query: req.query, msg: req.query.msg, user: req.user }, (err, html) => {
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

// @desc      Edit Member
// @route     PUT /members/:id
// @access    Private
exports.updateMember = asyncHandler(async (req, res, next) => {
    let member = await Member.findById(req.params.id);

    if (!member) {
        return next(
            new ErrorResponse(`Member not found`)
        );
    }

    await Member.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true
    });

    res.status(201).redirect("/manage");
});

// @desc      Delete Member
// @route     DELETE /members/:id
// @access    Private
exports.deleteMember = asyncHandler(async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return next(
            new ErrorResponse(`Member not found`)
        );
    }

    member.remove();

    res.status(201).redirect("/manage");
});