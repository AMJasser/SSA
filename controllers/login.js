const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Member = require("../models/Member");

// @desc      Get login page
// @route     GET /login
// @access    Public
exports.getLogin = asyncHandler(async (req, res, next) => {
    res.status(200).render(
        "login",
        { query: req.query, msg: req.query.msg, user: req.user },
        (err, html) => {
            if (err) {
                return next(new ErrorResponse("Problem Rendering", 500));
            } else {
                res.send(html);
            }
        }
    );
});

// @desc      Login user
// @route     POST /login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate emil & password
    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide an email and password", 400)
        );
    }

    // Check for user
    const user = await Member.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    //Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(200)
        .cookie("token", token, options)
        .redirect("/");
});