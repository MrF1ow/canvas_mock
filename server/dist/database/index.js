"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = void 0;
var mongo_database_1 = require("./mongo-database");
var config_1 = require("../config");
var environment_1 = require("../helpers/environment");
/**
 * Static instance of the database.
 */
var DatabaseInstace = null;
/**
 * Generates database based on environmental variables.
 */
var initializeDatabase = function () {
    if (!DatabaseInstace) {
        if (environment_1.Environment.getDatabaseType() === config_1.DATABASE_TYPE.MONGO
            || environment_1.Environment.getDatabaseType() === config_1.DATABASE_TYPE.MONGO_LOCAL) {
            DatabaseInstace = new mongo_database_1.MongoDatabase();
        }
    }
};
/**
 * Retrieves database based on environmental variables.
 *
 * @returns {Database} The database.
 */
var getDatabase = function () {
    initializeDatabase();
    return DatabaseInstace;
};
exports.getDatabase = getDatabase;
