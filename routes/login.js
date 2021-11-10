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
        return res.send( '<html><body>Hello!</body></html>' );
    })
);

module.exports = router;