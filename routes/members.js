const express = require('express');
const {
    getMembership,
    createMember
} = require("../controllers/members")

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router
    .route("/")
    .get(getMembership)
    .post(createMember);

module.exports = router;