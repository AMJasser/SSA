const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const router = express.Router({ mergeParams: true });

// @desc      Get index page
// @route     GET /
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        console.log(req.user);
        return res.status(200).render("index", { msg: req.query.msg, user: req.user }, (err, html) => {
            if (err) {
                return next(new ErrorResponse("Problem Rendering", 500));
            } else {
                res.send(html);
            }
        });
    })
);

module.exports = router;