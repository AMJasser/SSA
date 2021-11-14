const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Member = require("../models/Member");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(" ")[1];
        // Set token from cookie
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
        return next(
            new ErrorResponse("Not authorized to access this route", 401)
        );
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = await Member.findById(decoded.id);

        if (req.user.isActivated === false) {
            return next(
                new ErrorResponse("Account not activated yet", 401)
            );
        }

        next();
    } catch (err) {
        return next(
            new ErrorResponse("Not authorized to access this route", 401)
        );
    }
});

// Protect admin route
exports.protectAdmin = () => {
    return (req, res, next) => {
        if (req.user.isAdmin === false) {
            return next(
                new ErrorResponse(
                    `Member is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};
