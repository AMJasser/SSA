const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        unique: true,
        match: [
            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
            "Please add a valid phone number"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypt password using bcrypt
MemberSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
MemberSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
MemberSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Member', MemberSchema);