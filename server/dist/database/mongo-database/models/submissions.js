"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionModel = void 0;
// Packages
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    assignmentId: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    grade: {
        type: Number,
        default: 0,
    },
    file: {
        type: String,
        default: "",
    },
});
exports.SubmissionModel = (0, mongoose_1.model)("Submission", schema);
