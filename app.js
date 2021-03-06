/* eslint-disable no-unused-vars */
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require('method-override');
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const { checkAuth } = require("./middleware/auth")

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const index = require("./routes/index");
const events = require("./routes/events");
const contact = require("./routes/contact");
const members = require("./routes/members");
const auth = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");

// ability to use all HTTP methods using method-override library
app.use(methodOverride('_method'));

// Body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Cookie parser
app.use(cookieParser());

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
        "default-src 'self'; font-src 'self' fonts.googleapis.com fonts.gstatic.com; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; frame-src 'self' google.com docs.google.com;"
    );
    next();
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Check if user is authenticated
app.use(checkAuth);

// Mount routers
app.use("/", index);
app.use("/events", events);
app.use("/contact", contact);
app.use("/members", members);
app.use("/", auth);

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