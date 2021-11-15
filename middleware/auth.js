const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Member = require("../models/Member");

//Check if user is authenticated
exports.checkAuth = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(" ")[1];
        // Set token from cookie
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next();
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = await Member.findById(decoded.id);

        next();
    } catch (err) {
        return next();
    }
})

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return next(
            new ErrorResponse("Not authorized to access this route", 401)
        );
    }

    if (req.user.isActivated === false) {
        return next(new ErrorResponse("Account not activated yet", 401));
    }

    next();
});

// Protect admin route
exports.protectAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    if (req.user.isAdmin === false) {
        return next(
            new ErrorResponse(
                `Member is not authorized to access this route`,
                403
            )
        );
    }
    next();
});
