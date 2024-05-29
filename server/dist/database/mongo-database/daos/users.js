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
exports.UserDataAccessObject = void 0;
// Local Imports
var models_1 = require("../models");
var dao_1 = require("./dao");
/**
 * Data access object for Users.
 */
var UserDataAccessObject = /** @class */ (function (_super) {
    __extends(UserDataAccessObject, _super);
    function UserDataAccessObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves mongoose Model for DataAccessObject.
     */
    UserDataAccessObject.prototype._getModel = function () {
        return models_1.UserModel;
    };
    /**
     * Retrieves default sort value.
     *
     * @returns {Record<string, number>} Sort method.
     */
    UserDataAccessObject.prototype._getTimeSort = function () {
        return {
            hours: -1,
        };
    };
    return UserDataAccessObject;
}(dao_1.DataAccessObject));
exports.UserDataAccessObject = UserDataAccessObject;
