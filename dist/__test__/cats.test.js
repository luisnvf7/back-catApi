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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const database_1 = __importDefault(require("../database"));
const getCats_1 = require("../utils/getCats");
let request = supertest_1.default(app_1.default);
/* Siempre deberia de dar 100 por el valor limit en el endpoint de the cat api */
test("Prueba", () => __awaiter(void 0, void 0, void 0, function* () {
    let cats = yield getCats_1.getCats();
    expect(cats.data.length).toBe(100);
}));
/* Comprueba si no hay sesion activa para pasar por el middleware */
test('Prueba de logout', () => __awaiter(void 0, void 0, void 0, function* () {
    yield request
        .get('/cats')
        .expect(302);
}));
test('Prueba de logout', () => __awaiter(void 0, void 0, void 0, function* () {
    yield request
        .get('/categories')
        .expect(302);
}));
test('Prueba de logout', () => __awaiter(void 0, void 0, void 0, function* () {
    yield request
        .get('/filtercats')
        .expect(302);
}));
afterAll(() => {
    database_1.default.connection.close();
});
