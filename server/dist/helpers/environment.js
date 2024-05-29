"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
// Packages
var dotenv = __importStar(require("dotenv"));
// Local Imports
var config_1 = require("../config");
// Setting up DotEnv
dotenv.config();
/**
 * Static methods for retrieving environment variables.
 *
 * @static
 */
var Environment = /** @class */ (function () {
    function Environment() {
    }
    /**
     * Retrieves the port the server should run on.
     *
     * @default 3000
     * @returns {number} Server port.
     */
    Environment.getPort = function () {
        return parseInt(process.env.PORT, 10) || 3000;
    };
    /**
     * Retrieves name of database to use.
     *
     * @default 'development'
     * @returns {string} Name of database.
     */
    Environment.getDatabaseName = function () {
        return process.env.DATABASE_NAME || 'development';
    };
    /**
     * Retrieves password for connecting with database if needed.
     *
     * @default ''
     * @returns {string} Password for connecting with database if needed.
     */
    Environment.getDatabasePassword = function () {
        return process.env.DATABASE_PASSWORD || '';
    };
    /**
     * Retrieves URL for connecting with database if needed.
     *
     * @default 'mongodb://localhost:27017/'
     * @returns {string} URL for connecting with database if needed.
     */
    Environment.getDatabaseUrl = function () {
        return process.env.DATABASE_URL || 'mongodb://localhost:27017/';
    };
    /**
     * Retrieves username for connecting with database if needed.
     *
     * @default 'server'
     * @returns {string} Username for connecting with database if needed.
     */
    Environment.getDatabaseUser = function () {
        return process.env.DATABASE_USER || 'server';
    };
    /**
     * Retrieves type of database to use.
     *
     * @default 'cache'
     * @returns {string} Type of database to use.
     */
    Environment.getDatabaseType = function () {
        return process.env.DATABASE_TYPE || 'cache';
    };
    /**
     * Returns origin URL depending on environment.
     *
     * @default DEVELOPMENT_URL
     * @returns {string} Origin URL.
     */
    Environment.getOrigin = function () {
        if (process.env.ORIGIN_URL && process.env.ORIGIN_URL.length) {
            return process.env.ORIGIN_URL;
        }
        if (process.env.ENVIRONMENT === 'production') {
            return config_1.PRODUCTION_URL;
        }
        return config_1.DEVELOPMENT_URL;
    };
    /**
     * Retrieves server secret.
     *
     * @default Environment._generateSecret
     * @returns {string} Server secret.
     */
    Environment.getSecret = function () {
        return process.env.SECRET || Environment._generateSecret;
    };
    /**
     * Whether log layer DEBUG is enabled.
     *
     * @default false
     * @returns {boolean} Whether log layer DEBUG is enabled.
     */
    Environment.isDebugLayerEnabled = function () {
        return process.env.ENABLE_DEBUG_LAYER === 'true';
    };
    /**
     * Whether log layer PROGRESS is enabled.
     *
     * @default false
     * @returns {boolean} Whether log layer PROGRESS is enabled.
     */
    Environment.isProgressLayerEnabled = function () {
        return process.env.ENABLE_PROGRESS_LAYER === 'true';
    };
    /**
     * Whether log layer SUCCESS is enabled.
     *
     * @default false
     * @returns {boolean} Whether log layer SUCCESS is enabled.
     */
    Environment.isSuccessLayerEnabled = function () {
        return process.env.ENABLE_SUCCESS_LAYER === 'true';
    };
    /**
     * Whether log layer UPDATE is enabled.
     *
     * @default false
     * @returns {boolean} Whether log layer UPDATE is enabled.
     */
    Environment.isUpdateLayerEnabled = function () {
        return process.env.ENABLE_UPDATE_LAYER === 'true';
    };
    /**
     * Whether log layer WARNING is enabled.
     *
     * @default false
     * @returns {boolean} Whether log layer WARNING is enabled.
     */
    Environment.isWarningLayerEnabled = function () {
        return process.env.ENABLE_WARNING_LAYER === 'true';
    };
    /**
     * Pregenerated secret.
     *
     * @type {string}
     * @access private
     */
    Environment._generateSecret = (Math.random() + 1)
        .toString(36)
        .substring(7);
    return Environment;
}());
exports.Environment = Environment;
