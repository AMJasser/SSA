const dotenv = require("dotenv");
const Member = require("../models/Member");
const connectDB = require('../config/db');
const asyncHandler = require("../middleware/async");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const seedLogin = asyncHandler(async () => {
    const user = {
        name: "Abdullah AlJasser",
        email: "aaljasser3@gatech.edu",
        phone: "4708126969",
        password: "Aboody.204"
    }

    await Member.create(user);
});

seedLogin();

console.log("successful seed")
process.exit(0);