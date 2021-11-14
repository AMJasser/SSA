const express = require('express');
const {
    createUser
} = require("../controllers/users")

const router = express.Router({ mergeParams: true });

const { protect } = require("../middleware/auth");

router
    .route("/")
    .post(createUser);

module.exports = router;