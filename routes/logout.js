const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const router = express.Router({ mergeParams: true });

// @desc      logout
// @route     GET /logout
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        res.cookie("token", "none", {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).redirect("/");
    })
);

module.exports = router;
