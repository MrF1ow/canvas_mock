"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledModel = void 0;
// Packages
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    studentId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
});
exports.EnrolledModel = (0, mongoose_1.model)('Enrolled', schema);
