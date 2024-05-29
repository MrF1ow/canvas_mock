"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = exports.SubmissionRoutes = exports.CourseRoutes = exports.AssignmentRoutes = void 0;
// Local Imports
var assignments_1 = require("./assignments");
var courses_1 = require("./courses");
var submissions_1 = require("./submissions");
var users_1 = require("./users");
exports.AssignmentRoutes = new assignments_1.AssignmentRoutes();
exports.CourseRoutes = new courses_1.CourseRoutes();
exports.SubmissionRoutes = new submissions_1.SubmissionRoutes();
exports.UserRoutes = new users_1.UserRoutes();
