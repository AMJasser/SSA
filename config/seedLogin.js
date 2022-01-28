const dotenv = require("dotenv");
const Member = require("../models/Member");
const connectDB = require('./db');
const asyncHandler = require("../middleware/async");

// Load env vars
dotenv.config({ path: "./config.env" });

// Connect to database
connectDB();

const seedLogin = asyncHandler(async () => {
    const user = {
        name: "Abdullah AlJasser",
        email: "aaljasser3@gatech.edu",
        phone: "4708126969",
        password: "Aboody.204",
	isAdmin: true,
	isActivated: true
    }

    await Member.create(user);
    console.log("Successful seed");
    process.exit(0);
});

seedLogin();
