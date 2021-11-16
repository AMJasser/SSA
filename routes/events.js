const express = require('express');
const {
    getEvents,
    createEvent,
    deleteEvent
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

module.exports = router;