"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
// Local Imports
var create_course_students_handler_1 = require("./create-course-students-handler");
var get_course_assignments_handler_1 = require("./get-course-assignments-handler");
var get_course_students_1 = require("./get-course-students");
var get_course_roster_handler_1 = require("./get-course-roster-handler");
var delete_course_handler_1 = require("./delete-course-handler");
var create_course_handler_1 = require("./create-course-handler");
var get_courses_handler_1 = require("./get-courses-handler");
var edit_course_handler_1 = require("./edit-course-handler");
var get_course_handler_1 = require("./get-course-handler");
var router_1 = require("../router");
/**
 * Course routes.
 */
var CourseRoutes = /** @class */ (function (_super) {
    __extends(CourseRoutes, _super);
    /**
     * Instantiates an router wrapper.
     */
    function CourseRoutes() {
        return _super.call(this, '/courses') || this;
    }
    /**
     * Initializes all routes.
     *
     * @returns {void}
     */
    CourseRoutes.prototype._initialize = function () {
        this._routes.push(new create_course_handler_1.CreateCourseHandler());
        this._routes.push(new create_course_students_handler_1.CreateCourseStudentsHandler());
        this._routes.push(new delete_course_handler_1.DeleteCourseHandler());
        this._routes.push(new edit_course_handler_1.EditCourseHandler());
        this._routes.push(new get_course_assignments_handler_1.GetCourseAssignmentsHandler());
        this._routes.push(new get_course_handler_1.GetCourseHandler());
        this._routes.push(new get_course_roster_handler_1.GetCourseRosterHandler());
        this._routes.push(new get_course_students_1.GetCourseStudentsHandler());
        this._routes.push(new get_courses_handler_1.GetCoursesHandler());
    };
    return CourseRoutes;
}(router_1.Router));
exports.CourseRoutes = CourseRoutes;
