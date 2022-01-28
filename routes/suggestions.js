const express = require("express");
const {
    createSuggestion,
    deleteSuggestion,
    upvote,
    downvote
} = require("../controllers/suggestions")

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");

router.post("/", createSuggestion);
router.delete("/:id", protect, protectAdmin, deleteSuggestion);
router.get("/:id/upvote", protect, upvote);
router.get("/:id/downvote", protect, downvote);

module.exports = router;