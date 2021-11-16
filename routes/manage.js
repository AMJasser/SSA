const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Member  = require("../models/Member");

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");

router.use(protect, protectAdmin);

// @desc      Get manage page
// @route     GET /about
// @access    Private/admin
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const members = await Member.find();

        viewResponse(req, res, "manage", { members });
    })
);

module.exports = router;