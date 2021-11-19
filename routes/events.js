const express = require('express');
const {
    getEvents,
    createEvent,
    deleteEvent,
    rsvp,
    dersvp,
    getEditEvent,
    editEvent,
    deletePicture
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
    .route("/:id")
    .delete(protect, protectAdmin, deleteEvent)
    .put(protect, protectAdmin, upload.fields([
        { name: "mainPhoto", maxCount: 1 },
        { name: "photo" }
    ]), editEvent);

router
    .post("/:id/rsvp", protect, rsvp);

router
    .post("/:id/dersvp", protect, dersvp);

router
    .get("/:id/edit", protect, protectAdmin, getEditEvent);

module.exports = router;