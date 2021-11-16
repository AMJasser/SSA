const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const viewResponse = require("../utils/viewResponse");
const asyncHandler = require("../middleware/async");

const router = express.Router({ mergeParams: true });

// @desc      Get index page
// @route     GET /
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        viewResponse(req, res, next, "index");
    })
);

module.exports = router;