const express = require('express');
const {
    getEvents,
    createEvent,
    deleteEvent,
    rsvp,
    dersvp
} = require("../controllers/events")

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
    .route("/")
    .get(getEvents)
    .post(protect, protectAdmin, upload.fields([
        { name: "mainPhoto", maxCount: 1 },
        { name: "photo" }
    ]), createEvent)

router
    .delete("/:id", protect, protectAdmin, deleteEvent);

router
    .post("/:id/rsvp", protect, rsvp);

router
    .post("/:id/dersvp", dersvp);

module.exports = router;