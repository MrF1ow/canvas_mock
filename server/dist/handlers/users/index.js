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
exports.UserRoutes = void 0;
// Local Imports
var register_handler_1 = require("./register-handler");
var get_user_handler_1 = require("./get-user-handler");
var login_handler_1 = require("./login-handler");
var router_1 = require("../router");
/**
 * User routes.
 */
var UserRoutes = /** @class */ (function (_super) {
    __extends(UserRoutes, _super);
    /**
     * Instantiates an router wrapper.
     */
    function UserRoutes() {
        return _super.call(this, '/users') || this;
    }
    /**
     * Initializes all routes.
     *
     * @returns {void}
     */
    UserRoutes.prototype._initialize = function () {
        this._routes.push(new get_user_handler_1.GetUserHandler());
        this._routes.push(new login_handler_1.LoginHandler());
        this._routes.push(new register_handler_1.RegisterHandler());
    };
    return UserRoutes;
}(router_1.Router));
exports.UserRoutes = UserRoutes;
