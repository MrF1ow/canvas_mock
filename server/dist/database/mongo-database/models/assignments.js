"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentModel = void 0;
// Packages
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    courseId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: 'Unknown',
    },
    points: {
        type: Number,
        default: 0,
    },
    due: {
        type: Date,
        default: new Date(),
    },
});
exports.AssignmentModel = (0, mongoose_1.model)('Assignment', schema);
