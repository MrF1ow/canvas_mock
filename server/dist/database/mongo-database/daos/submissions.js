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
exports.SubmissionDataAccessObject = void 0;
// Local Imports
var models_1 = require("../models");
var dao_1 = require("./dao");
/**
 * Data access object for Submissions.
 */
var SubmissionDataAccessObject = /** @class */ (function (_super) {
    __extends(SubmissionDataAccessObject, _super);
    function SubmissionDataAccessObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves mongoose Model for DataAccessObject.
     */
    SubmissionDataAccessObject.prototype._getModel = function () {
        return models_1.SubmissionModel;
    };
    /**
     * Retrieves default sort value.
     *
     * @returns {Record<string, number>} Sort method.
     */
    SubmissionDataAccessObject.prototype._getTimeSort = function () {
        return {
            hours: -1,
        };
    };
    return SubmissionDataAccessObject;
}(dao_1.DataAccessObject));
exports.SubmissionDataAccessObject = SubmissionDataAccessObject;
