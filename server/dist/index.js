"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Local Imports
var server_1 = require("./server");
/**
 * Starts the server.
 *
 * @returns {void}
 */
var main = function () {
    var server = new server_1.Server();
    server.start();
};
main();
