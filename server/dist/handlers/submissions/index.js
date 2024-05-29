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
exports.SubmissionRoutes = void 0;
// Local Imports
var get_submission_media_handler_1 = require("./get-submission-media-handler");
var edit_submission_handler_1 = require("./edit-submission-handler");
var router_1 = require("../router");
/**
 * Submission routes.
 */
var SubmissionRoutes = /** @class */ (function (_super) {
    __extends(SubmissionRoutes, _super);
    /**
     * Instantiates an router wrapper.
     */
    function SubmissionRoutes() {
        return _super.call(this, '/submissions') || this;
    }
    /**
     * Initializes all routes.
     *
     * @returns {void}
     */
    SubmissionRoutes.prototype._initialize = function () {
        this._routes.push(new edit_submission_handler_1.EditSubmissionHandler());
        this._routes.push(new get_submission_media_handler_1.GetSubmissionMediaHandler());
    };
    return SubmissionRoutes;
}(router_1.Router));
exports.SubmissionRoutes = SubmissionRoutes;
