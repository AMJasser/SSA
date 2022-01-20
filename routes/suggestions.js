const express = require("express");
const {
    getSuggestions,
    createSuggestion,
    deleteSuggestion
} = require("../controllers/suggestions")

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");

router.get("/", getSuggestions);
router.post("/", createSuggestion);
router.delete("/:id", protect, protectAdmin, deleteSuggestion);

module.exports = router;