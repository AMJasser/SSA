const express = require('express');
const {
    getLogin,
    login
} = require("../controllers/login")

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(getLogin)
    .post(login);

module.exports = router;