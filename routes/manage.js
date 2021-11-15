const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
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
        const unactivatedMembers = await Member.find({
            isActivated: false
        });

        return res.status(200).render("manage", { unactivatedMembers, msg: req.query.msg }, (err, html) => {
            if (err) {
                return next(new ErrorResponse("Problem Rendering", 500));
            } else {
                res.send(html);
            }
        });
    })
);

module.exports = router;