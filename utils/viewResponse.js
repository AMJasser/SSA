const ErrorResponse = require("./errorResponse");

const viewResponse = (req, res, next, view, passedLocals) => {
    const locals = {
        query: req.query,
        msg: req.query.msg,
        user: req.user
    }

    if (passedLocals) {
        for (const [key, value] of Object.entries(passedLocals)) {
            locals[key] = value
        }
    }

    res.status(200).render(view, locals, (err, html) => {
        if (err) {
            return next(new ErrorResponse("Problem Rendering", 500));
        } else {
            res.send(html);
        }
    });
}

module.exports = viewResponse;