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
// Local Imports
var messages_1 = require("../config/messages");
/**
 * Abstract Data Access Object Class Used Error.
 */
var UsedAbstractDAOError = /** @class */ (function (_super) {
    __extends(UsedAbstractDAOError, _super);
    function UsedAbstractDAOError() {
        return _super.call(this, messages_1.MESSAGE_USED_ABSTRACT_DAO_ERROR) || this;
    }
    return UsedAbstractDAOError;
}(Error));
exports.default = UsedAbstractDAOError;
