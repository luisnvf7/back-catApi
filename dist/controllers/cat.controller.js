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
exports.filterCats = exports.catsCategories = exports.cats = void 0;
const cat_1 = __importDefault(require("../models/cat"));
const catLogic_1 = require("../utils/catLogic");
const getCats_1 = require("../utils/getCats");
const cats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skip = 0;
    /* Comprueba si se le pasa algun parametro, en caso de que no, el skip será 0 */
    if (req.query.page !== "0") {
        //@ts-ignore
        skip = (req.query.page - 1) * 20;
    }
    /* Para la paginacion */
    let existingCats = yield cat_1.default.find().limit(20).skip(skip);
    if (existingCats.length > 0) {
        return res.status(200).json(existingCats);
    }
    else {
        let cats = yield getCats_1.getCats();
        /* Promise.all para guardar cada uno de los elementos en mongo como documentos separados. */
        let cats_values = yield Promise.all(cats.data.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
            return yield new cat_1.default(cat).save();
        })));
        /* Se realiza el slice ya que al momento de entrar el user por primer vez, el page siempre sera = 1,
        para ahorrar la peticion de mas, se usa el slice de arreglos.
        */
        cats_values = cats_values.slice(0, 20);
        return res.status(200).json(cats_values);
    }
});
exports.cats = cats;
/* Funcion creada para mostrar todos las razas y categorias
y mapearlas en los dropdowns */
const catsCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let existingCats = yield cat_1.default.find();
    let breeds = catLogic_1.catBreedsFn(existingCats);
    let categories = catLogic_1.catCategories(existingCats);
    return res.status(200).json({ breeds, categories });
});
exports.catsCategories = catsCategories;
const filterCats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* Verifica si algun parametro está vacio. */
    if (!!!req.query.order || !!!req.query.breed || !!!req.query.category) {
        return res.status(400).json({ error: "Campo requerido" });
    }
    /* Filtro a todos los que tengan tanto la raza seleccionada o la categoria
      y se ordena por id (id de los gatos de thecatapi y no de mongodb).
    */
    let cats_filtered = yield cat_1.default.find({
        $or: [
            { breeds: { $elemMatch: { id: req.query.breed } } },
            { categories: { $elemMatch: { id: req.query.category } } },
        ],
    }).sort({ id: req.query.order === "desc" ? -1 : 1 });
    return res.status(200).json(cats_filtered);
});
exports.filterCats = filterCats;
