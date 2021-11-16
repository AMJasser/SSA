const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
    },
});

module.exports = multer({ storage: storage });