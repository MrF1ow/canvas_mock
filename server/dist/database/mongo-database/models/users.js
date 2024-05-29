"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// Packages
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "student",
    },
});
exports.UserModel = (0, mongoose_1.model)("User", schema);
