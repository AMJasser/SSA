const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Member = require("../models/Member");

// @desc      Get login page
// @route     GET /login
// @access    Public
exports.getLogin = asyncHandler(async (req, res, next) => {
    res.status(200).render("login", { query: req.query, msg: req.query.msg }, (err, html) => {
        if (err) {
            return next(new ErrorResponse("Problem Rendering", 500));
        } else {
            res.send(html);
        }
    });
});