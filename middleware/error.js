const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    var params = [];

    error.message = err.message;

    // Log to console for dev
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = "There is already a member with similar information";
        error = new ErrorResponse(message, 400);
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    if (req.body) {
        if (req.body.password) {
            delete req.body.password;
        }
        for (const [key, value] of Object.entries(req.body)) {
            params.push(key + "=" + value);
        }
    }

    params.push("msg=" + error.message);
    
    res.status(error.statusCode || 500).redirect(req.url + "?" + params.join("&"));
};

module.exports = errorHandler;