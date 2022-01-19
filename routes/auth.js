const express = require('express');
const {
    getLogin,
    login,
    logout
} = require("../controllers/auth")

const router = express.Router({ mergeParams: true });

router
    .route("/login")
    .get(getLogin)
    .post(login);

router.get("/logout", logout);

module.exports = router;