"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
// Packages
var express_1 = require("express");
// Local Imports
var config_1 = require("../config");
/**
 * Wrapper around express router.
 */
var Router = /** @class */ (function () {
    /**
     * Instantiates an router wrapper.
     */
    function Router(path) {
        /**
         * Various handlers.
         */
        this._routes = [];
        this._path = path;
        this._router = (0, express_1.Router)();
        this._initialize();
    }
    /**
     * Initializes all routes.
     *
     * @returns {void}
     */
    Router.prototype._initialize = function () {
    };
    /**
     * Apply various routes to application.
     *
     * @param {Application} app Express application.
     * @returns {void}
     */
    Router.prototype.apply = function (app) {
        for (var i = 0; i < this._routes.length; i += 1) {
            var handler = this._routes[i];
            switch (handler.getMethod()) {
                case config_1.REQUEST_TYPE.POST:
                    app.post(handler.getPath(), handler.execute);
                    break;
                case config_1.REQUEST_TYPE.PATCH:
                    app.patch(handler.getPath(), handler.execute);
                    break;
                case config_1.REQUEST_TYPE.DELETE:
                    app.patch(handler.getPath(), handler.execute);
                    break;
                default:
                    app.get(handler.getPath(), handler.execute);
                    break;
            }
        }
    };
    return Router;
}());
exports.Router = Router;
