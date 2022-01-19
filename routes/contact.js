const express = require("express");
const ErrorResponse = require("../utils/errorResponse");
const Contact = require("../models/Contact");
const viewResponse = require("../utils/viewResponse");
const asyncHandler = require("../middleware/async");

const router = express.Router({ mergeParams: true });

// @desc      Get about page
// @route     GET /contact
// @access    Public
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        viewResponse(req, res, next, "contact");
    })
);

// @desc      Create contact
// @route     POST /contact
// @access    Public
router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        await Contact.create(req.body);

        res.status(201).redirect("/");
    })
);

module.exports = router;