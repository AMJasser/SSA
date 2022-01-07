const express = require('express');
const {
    getMembership,
    createMember,
    updateMember,
    deleteMember,
    exportMembers
} = require("../controllers/members")

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");

router
    .route("/")
    .get(getMembership)
    .post(createMember);

router
    .route("/:id")
    .put(protect, protectAdmin, updateMember)
    .delete(protect, protectAdmin, deleteMember);

router
    .get("/export", protect, protectAdmin, exportMembers)

module.exports = router;