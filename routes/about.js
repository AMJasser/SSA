const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const router = express.Router({ mergeParams: true });

// @desc      Get about page
// @route     GET /about
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        return res.status(200).render("about", { msg: req.query.msg, user: req.user }, (err, html) => {
            if (err) {
                return next(new ErrorResponse("Problem Rendering", 500));
            } else {
                res.send(html);
            }
        });
    })
);

module.exports = router;