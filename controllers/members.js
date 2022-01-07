const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const viewResponse = require("../utils/viewResponse");
const Member = require("../models/Member");
const excelJS = require("exceljs");

// @desc      Get membership page
// @route     GET /members
// @access    Public
exports.getMembership = asyncHandler(async (req, res, next) => {
    viewResponse(req, res, next, "membership");
});

// @desc      Create member
// @route     POST /members
// @access    Public
exports.createMember = asyncHandler(async (req, res, next) => {
    await Member.create(req.body);

    res.status(201).redirect("/");
});

// @desc      Edit Member
// @route     PUT /members/:id
// @access    Private
exports.updateMember = asyncHandler(async (req, res, next) => {
    let member = await Member.findById(req.params.id);

    if (!member) {
        return next(
            new ErrorResponse(`Member not found`)
        );
    }

    await Member.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true
    });

    res.status(201).redirect("/manage");
});

// @desc      Delete Member
// @route     DELETE /members/:id
// @access    Private
exports.deleteMember = asyncHandler(async (req, res, next) => {
    const member = await Member.findById(req.params.id);

    if (!member) {
        return next(
            new ErrorResponse(`Member not found`)
        );
    }

    member.remove();

    res.status(201).redirect("/manage");
});

// @desc      Export members excel
// @route     GET /members/export
// @access    Private
exports.exportMembers = asyncHandler(async (req, res, next) => {
    const members = await Member.find();

    const workbook = new excelJS.Workbook();

    const worksheet = workbook.addWorksheet("Users");

    const path = "./public";

    worksheet.columns = [
        { header: "name", key: "name", width: 10 },
        { header: "email", key: "email", width: 10 },
        { header: "phone", key: "phone", width: 10 },
        { header: "password", key: "password", width: 10 },
        { header: "isAdmin", key: "isAdmin", width: 10 },
        { header: "isActivated", key: "isActivated", width: 10 },
        { header: "createdAt", key: "createdAt", width: 10 },
    ]

    let counter = 1;
    members.forEach((user) => {
        user.name = counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
    });

    const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)

    res.status(200).download(`${path}/users.xlsx`);
});