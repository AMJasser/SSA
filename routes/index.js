const express = require("express");
const {
    getIndex,
    getAbout,
    getManage
} = require("../controllers/index")

const router = express.Router({ mergeParams: true });

const { protect, protectAdmin } = require("../middleware/auth");

router.get("/", getIndex);
router.get("/about", getAbout);
router.get("/manage", protect, protectAdmin, getManage);

module.exports = router;