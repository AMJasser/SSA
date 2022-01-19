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

// @desc      Delete contact
// @route     POST /contact/:id
// @access    Public
router.delete(
    "/:id/",
    asyncHandler(async (req, res, next) => {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return next(
                new ErrorResponse(`Contact not found`)
            );
        }

        contact.remove();

        res.status(201).redirect("/manage");
    })
);

module.exports = router;