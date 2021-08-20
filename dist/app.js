"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Archivo global con todas sus configuraciones */
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cat_route_1 = __importDefault(require("./routes/cat.route"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const config_1 = __importDefault(require("./config//config"));
const cors_1 = __importDefault(require("cors"));
const environment_dev_1 = require("./environments/environment.dev");
const app = express_1.default();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cookie_session_1.default({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config_1.default.cookies.key]
}));
app.use(cors_1.default({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: environment_dev_1.environment.frontEnd,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
/* Rutas */
app.use(auth_route_1.default);
app.use(cat_route_1.default);
app.set('port', process.env.PORT || 3000);
exports.default = app;
