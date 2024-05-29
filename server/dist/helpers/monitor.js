"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monitor = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// Local Imports
var environment_1 = require("./environment");
/**
 * This class replaces console.log for a more standardized
 * way of logging.
 */
var Monitor = /** @class */ (function () {
    function Monitor() {
    }
    /**
     * Print a statement to the console.
     *
     * @param {string} text Text to be printed.
     * @param {number} layer Layer to print text to.
     */
    Monitor.log = function (source, text, layer) {
        if (layer === void 0) { layer = 0; }
        if (Monitor._shouldLog(layer)) {
            console.log("".concat(Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING["".concat(layer)], "[").concat(source.name, "]:").concat(Monitor.STD_OUT_ESCAPE_CODE_RESET), "".concat(Monitor.STD_OUT_MONITOR_LAYER_MESSAGE_FORMATING["".concat(layer)]).concat(text).concat(Monitor.STD_OUT_ESCAPE_CODE_RESET));
        }
    };
    /**
     * Print a trace statement to the console.
     *
     * @param {string} text Text to be printed.
     * @param {number} layer Layer to print text to.
     */
    Monitor.trace = function (source, text, layer) {
        if (layer === void 0) { layer = 0; }
        if (Monitor._shouldLog(layer)) {
            console.trace("".concat(Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING["".concat(layer)], "[").concat(source.name, "]:").concat(Monitor.STD_OUT_ESCAPE_CODE_RESET), "".concat(Monitor.STD_OUT_MONITOR_LAYER_MESSAGE_FORMATING["".concat(layer)]).concat(text).concat(Monitor.STD_OUT_ESCAPE_CODE_RESET));
        }
    };
    /**
     * Displays memory update.
     */
    Monitor.logMemory = function () {
        var mbUsed = Math.round(process.memoryUsage().heapUsed / 1024 / 10.24) / 100;
        Monitor.log(Monitor, "Memory in Use: ".concat(mbUsed, " MB"), Monitor.Layer.WARNING);
    };
    /**
     * Returns whether or not the layer is active.
     * @param {number} layer Monitor layer.
     * @returns {boolean} Whether the layer is active.
     */
    Monitor._shouldLog = function (layer) {
        return true;
        if (layer === Monitor.Layer.DEBUG) {
            return environment_1.Environment.isDebugLayerEnabled();
        }
        if (layer === Monitor.Layer.WARNING) {
            return environment_1.Environment.isWarningLayerEnabled();
        }
        return environment_1.Environment.isUpdateLayerEnabled();
    };
    /**
     * StOut escape code for resetting formatting.
     *
     * @constant
     */
    Monitor.STD_OUT_ESCAPE_CODE_RESET = "\x1b[0m";
    /**
     * Format for different monitor layers.
     *
     * @constant
     */
    Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING = {
        0: "\x1b[90m", // DEBUG Grey
        1: "\x1b[91m", // WARNING Red
        2: "\x1b[33m", // UPDATE Yellow
        3: "\x1b[32m", // SUCCESS Green
        4: "\x1b[32m", // PROGRESS Blue
    };
    /**
     * Format for different monitor layers.
     *
     * @constant
     */
    Monitor.STD_OUT_MONITOR_LAYER_MESSAGE_FORMATING = {
        0: "\x1b[90m", // DEBUG
        1: "\x1b[37m", // WARNING
        2: "\x1b[37m", // UPDATE
        3: "\x1b[37m", // UPDATE
        4: "\x1b[37m", // UPDATE
    };
    /**
     * Layers of monitor output.
     *
     * @constant
     */
    Monitor.Layer = {
        DEBUG: 0,
        WARNING: 1,
        UPDATE: 2,
        SUCCESS: 3,
        PROGRESS: 4,
    };
    return Monitor;
}());
exports.Monitor = Monitor;
