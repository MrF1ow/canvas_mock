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
exports.AssignmentRoutes = void 0;
// Local Imports
var create_assignment_submissions_handler_1 = require("./create-assignment-submissions-handler");
var get_assignment_submissions_handler_1 = require("./get-assignment-submissions-handler");
var create_assignment_handler_1 = require("./create-assignment-handler");
var delete_assignment_handler_1 = require("./delete-assignment-handler");
var edit_assignment_handler_1 = require("./edit-assignment-handler");
var get_assignment_handler_1 = require("./get-assignment-handler");
var router_1 = require("../router");
/**
 * Assignment routes.
 */
var AssignmentRoutes = /** @class */ (function (_super) {
    __extends(AssignmentRoutes, _super);
    /**
     * Instantiates an router wrapper.
     */
    function AssignmentRoutes() {
        return _super.call(this, '/assignments') || this;
    }
    /**
     * Initializes all routes.
     *
     * @returns {void}
     */
    AssignmentRoutes.prototype._initialize = function () {
        this._routes.push(new create_assignment_handler_1.CreateAssignmentHandler());
        this._routes.push(new create_assignment_submissions_handler_1.CreateAssignmentSubmissionsHandler());
        this._routes.push(new delete_assignment_handler_1.DeleteAssignmentHandler());
        this._routes.push(new edit_assignment_handler_1.EditAssignmentHandler());
        this._routes.push(new get_assignment_handler_1.GetAssignmentHandler());
        this._routes.push(new get_assignment_submissions_handler_1.GetAssignmentSubmissionsHandler());
    };
    return AssignmentRoutes;
}(router_1.Router));
exports.AssignmentRoutes = AssignmentRoutes;
