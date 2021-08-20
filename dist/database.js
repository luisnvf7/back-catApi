"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Archivo de configuracion de la base de datos. */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(config_1.default.db.URI, dbOptions);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("connectado a mongodb");
});
connection.on('error', err => {
    console.log(err);
    process.exit(0);
});
exports.default = mongoose_1.default;
