"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.SubmissionModel = exports.EnrolledModel = exports.CourseModel = exports.AssignmentModel = void 0;
// Local Exports
var assignments_1 = require("./assignments");
Object.defineProperty(exports, "AssignmentModel", { enumerable: true, get: function () { return assignments_1.AssignmentModel; } });
var courses_1 = require("./courses");
Object.defineProperty(exports, "CourseModel", { enumerable: true, get: function () { return courses_1.CourseModel; } });
var enrolled_1 = require("./enrolled");
Object.defineProperty(exports, "EnrolledModel", { enumerable: true, get: function () { return enrolled_1.EnrolledModel; } });
var submissions_1 = require("./submissions");
Object.defineProperty(exports, "SubmissionModel", { enumerable: true, get: function () { return submissions_1.SubmissionModel; } });
var users_1 = require("./users");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return users_1.UserModel; } });
