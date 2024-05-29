"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
// Packages
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    subject: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    instructorId: {
        type: String,
        required: true,
    },
});
exports.CourseModel = (0, mongoose_1.model)('Course', schema);
