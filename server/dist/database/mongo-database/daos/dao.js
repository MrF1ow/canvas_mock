"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccessObject = void 0;
/**
 * Abstract class for Data Access Objects.
 */
var DataAccessObject = /** @class */ (function () {
    /**
     * Instantiates a new DataAccessObject.
     */
    function DataAccessObject() {
        this._model = this._getModel();
    }
    /**
     * Retrieves default sort value.
     *
     * @returns {Record<string, number>} Sort method.
     */
    DataAccessObject.prototype._getSort = function () {
        return {};
    };
    /**
     * Pain.
     */
    DataAccessObject.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    /**
     * Not needed.
     */
    DataAccessObject.prototype.createTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Not needed.
     */
    DataAccessObject.prototype.dropTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Deletes all items from the Database.
     */
    DataAccessObject.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a new instance of the item in the Database.
     *
     * @param {T} options The item to create.
     * @returns {T} The created item.
     */
    DataAccessObject.prototype.insert = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = new this._model(item);
                        return [4 /*yield*/, row.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 1];
                }
            });
        });
    };
    /**
     * Finds one item in the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @param {QueryProjection} projection The projection to apply to the query.
     * @returns {Promise<T | null>} The item.
     */
    DataAccessObject.prototype.findOne = function () {
        return __awaiter(this, arguments, void 0, function (filter, projection) {
            if (filter === void 0) { filter = {}; }
            if (projection === void 0) { projection = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this._model.findOne(filter, projection)];
            });
        });
    };
    /**
     * Finds all of the item in the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @param {QueryProjection} projection The projection to apply to the query.
     * @param {QuerySort | null} sort The sort to apply to the query.
     * @returns {Promise<T[]>} The items.
     */
    DataAccessObject.prototype.find = function () {
        return __awaiter(this, arguments, void 0, function (filter, projection, sort, offset, limit) {
            var options;
            if (filter === void 0) { filter = {}; }
            if (projection === void 0) { projection = {}; }
            if (sort === void 0) { sort = null; }
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = -1; }
            return __generator(this, function (_a) {
                options = {};
                if (limit > 0) {
                    options.limit = limit;
                }
                if (offset > 0) {
                    options.skip = offset;
                }
                if (sort) {
                    options.sort = sort;
                }
                else {
                    options.sort = this._getSort();
                }
                return [2 /*return*/, this._model.find(filter, projection, options)];
            });
        });
    };
    /**
     * Finds an item by it's id from the Database.
     *
     * @param {string} id The id of the item.
     * @returns {Promise<T | null>} The item or null if not found.
     */
    DataAccessObject.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._model.findById(id)];
            });
        });
    };
    /**
     * Deletes all items or a subset of items from the Database.
     *
     * @param {QueryConditions} filter The filter to apply to the query.
     * @returns {Promise<number>} The number of items deleted.
     */
    DataAccessObject.prototype.delete = function () {
        return __awaiter(this, arguments, void 0, function (filter) {
            var deletedCount;
            if (filter === void 0) { filter = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.deleteMany(filter)];
                    case 1:
                        deletedCount = (_a.sent()).deletedCount;
                        return [2 /*return*/, deletedCount];
                }
            });
        });
    };
    /**
     * Deletes a single item by its id from the Database.
     *
     * @param {string} id The id of the item.
     * @returns {Promise<boolean>} Whether the item was deleted.
     */
    DataAccessObject.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.deleteOne({ _id: id })];
                    case 1:
                        deletedCount = (_a.sent()).deletedCount;
                        return [2 /*return*/, deletedCount === 1];
                }
            });
        });
    };
    /**
     * Updates one item in the Database matching the filter.
     *
     * @param {QueryConditions} filter
     * @param {QueryUpdate} update
     * @param {boolean} insertNew
     * @returns {Promise<boolean>} Whether the item was updated.
     */
    DataAccessObject.prototype.update = function () {
        return __awaiter(this, arguments, void 0, function (conditions, update) {
            var modifiedCount;
            if (conditions === void 0) { conditions = {}; }
            if (update === void 0) { update = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.updateOne(conditions, update, {
                            upsert: true,
                        })];
                    case 1:
                        modifiedCount = (_a.sent()).modifiedCount;
                        return [2 /*return*/, modifiedCount];
                }
            });
        });
    };
    /**
     * Updates all items in the Database matching the filter.
     *
     * @param {QueryConditions} filter
     * @param {QueryUpdate} update
     * @param {boolean} insertNew
     * @returns {Promise<number>} The number of documents updated.
     */
    DataAccessObject.prototype.updateMany = function () {
        return __awaiter(this, arguments, void 0, function (filter, update, insertNew) {
            var modifiedCount;
            if (filter === void 0) { filter = {}; }
            if (update === void 0) { update = {}; }
            if (insertNew === void 0) { insertNew = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.updateMany(filter, update, {
                            upsert: insertNew,
                        })];
                    case 1:
                        modifiedCount = (_a.sent()).modifiedCount;
                        return [2 /*return*/, modifiedCount];
                }
            });
        });
    };
    /**
     * Clears all items from the table.
     *
     * @returns {Promise<void>} Promise of the action.
     */
    DataAccessObject.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._model.deleteMany()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves mongoose Model for DataAccessObject.
     *
     * @returns {Model} The mongoose model.
     */
    DataAccessObject.prototype._getModel = function () {
        throw new Error('Used abstract DAO!');
    };
    return DataAccessObject;
}());
exports.DataAccessObject = DataAccessObject;
