"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    googleId: String,
    displayName: String
});
exports.default = mongoose_1.model('User', userSchema);
