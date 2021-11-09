/* eslint-disable no-unused-vars */
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const index = require("./routes/index");
const about = require("./routes/about");
const events = require("./routes/events");

const app = express();

app.set("view engine", "ejs");

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Allow Content-Security-Policy
app.use(function (req, res, next) {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self' *.amj.codes amj.codes edu-vents.com *.edu-vents.com; font-src 'self' *.amj.codes amj.codes edu-vents.com *.edu-vents.com fonts.googleapis.com fonts.gstatic.com; img-src 'self' *.amj.codes amj.codes edu-vents.com *.edu-vents.com; script-src 'self' 'unsafe-inline' *.amj.codes amj.codes edu-vents.com *.edu-vents.com; style-src 'self' 'unsafe-inline' *.amj.codes amj.codes edu-vents.com *.edu-vents.com fonts.googleapis.com; frame-src 'self' *.amj.codes amj.codes edu-vents.com *.edu-vents.com"
    );
    next();
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/", index);
app.use("/about", about);
app.use("/events", events);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});