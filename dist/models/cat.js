"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const catSchema = new mongoose_1.Schema({
    breeds: [
        {
            id: String,
            name: String,
        },
    ],
    categories: [
        {
            id: String,
            name: String,
        },
    ],
    height: Number,
    id: String,
    url: String,
    width: Number,
});
exports.default = mongoose_1.model("Cat", catSchema);
