"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccessObject = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// Local Imports
var used_abstract_dao_error_1 = __importDefault(require("../errors/used-abstract-dao-error"));
/**
 * Abstract Data Access Object
 */
var DataAccessObject = /** @class */ (function () {
    function DataAccessObject() {
    }
    /**
     * Clears all items from the table.
     *
     * @returns {Promise<void>} Promise of the action.
     */
    DataAccessObject.prototype.clear = function () {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Not needed.
     */
    DataAccessObject.prototype.createTable = function () {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Deletes all items or a subset of items from the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @returns {Promise<number>} The number of items deleted.
     */
    DataAccessObject.prototype.delete = function (conditions) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Deletes all items from the Database.
     */
    DataAccessObject.prototype.deleteAll = function () {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Deletes a single item by its id from the Database.
     *
     * @param {string} id The id of the item.
     * @returns {Promise<boolean>} Whether the item was deleted.
     */
    DataAccessObject.prototype.deleteById = function (id) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Not needed.
     */
    DataAccessObject.prototype.dropTable = function () {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Finds all of the item in the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @param {QueryProjection} projection The projection to apply to the query.
     * @returns {Promise<T[]>} The items.
     */
    DataAccessObject.prototype.find = function (conditions, projection, sort, offset, limit) {
        if (conditions === void 0) { conditions = {}; }
        if (projection === void 0) { projection = {}; }
        if (sort === void 0) { sort = null; }
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 20; }
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Finds an item by it's id from the Database.
     *
     * @param {string} id The id of the item.
     * @returns {Promise<T | null>} The item or null if not found.
     */
    DataAccessObject.prototype.findById = function (id) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Finds one item in the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @param {QueryProjection} projection The projection to apply to the query.
     * @returns {Promise<T | null>} The item.
     */
    DataAccessObject.prototype.findOne = function (conditions, projection) {
        if (projection === void 0) { projection = {}; }
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Creates a new instance of the item in the Database.
     *
     * @param {T} options The item to create.
     * @returns {T} The created item.
     */
    DataAccessObject.prototype.insert = function (item) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Pain.
     */
    DataAccessObject.prototype.query = function (query) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Updates one item in the Database matching the filter.
     *
     * @param {QueryConditions} filter
     * @param {QueryUpdate} update
     * @param {boolean} insertNew
     * @returns {Promise<boolean>} Whether the item was updated.
     */
    DataAccessObject.prototype.update = function (conditions, update) {
        throw new used_abstract_dao_error_1.default();
    };
    /**
     * Updates all items in the Database matching the filter.
     *
     * @param {QueryConditions} filter
     * @param {QueryUpdate} update
     * @param {boolean} insertNew
     * @returns {Promise<number>} The number of documents updated.
     */
    DataAccessObject.prototype.updateMany = function (filter, update, insertNew) {
        if (filter === void 0) { filter = {}; }
        if (update === void 0) { update = {}; }
        if (insertNew === void 0) { insertNew = true; }
        throw new used_abstract_dao_error_1.default();
    };
    return DataAccessObject;
}());
exports.DataAccessObject = DataAccessObject;
