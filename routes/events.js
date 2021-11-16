const express = require('express');
const {
    getEvents,
    createEvent
} = require("../controllers/events")

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
    .route("/")
    .get(getEvents)
    .post(upload.fields([
        { name: "mainPhoto", maxCount: 1 },
        { name: "photo" }
    ]), createEvent);

module.exports = router;