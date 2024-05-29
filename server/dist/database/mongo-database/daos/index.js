"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataAccessObject = exports.SubmissionDataAccessObject = exports.EnrolledDataAccessObject = exports.CourseDataAccessObject = exports.AssignmentDataAccessObject = void 0;
// Local Exports
var assignments_1 = require("./assignments");
Object.defineProperty(exports, "AssignmentDataAccessObject", { enumerable: true, get: function () { return assignments_1.AssignmentDataAccessObject; } });
var courses_1 = require("./courses");
Object.defineProperty(exports, "CourseDataAccessObject", { enumerable: true, get: function () { return courses_1.CourseDataAccessObject; } });
var enrolled_1 = require("./enrolled");
Object.defineProperty(exports, "EnrolledDataAccessObject", { enumerable: true, get: function () { return enrolled_1.EnrolledDataAccessObject; } });
var submissions_1 = require("./submissions");
Object.defineProperty(exports, "SubmissionDataAccessObject", { enumerable: true, get: function () { return submissions_1.SubmissionDataAccessObject; } });
var users_1 = require("./users");
Object.defineProperty(exports, "UserDataAccessObject", { enumerable: true, get: function () { return users_1.UserDataAccessObject; } });
