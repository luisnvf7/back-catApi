"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_controller_1 = require("../controllers/cat.controller");
const isUserLogged_1 = require("../utils/isUserLogged");
const router = express_1.Router();
/* Lista todos los gatos */
router.get("/cats", isUserLogged_1.isLogged, cat_controller_1.cats);
/* Lista las categorias que se mapearan en los dropdowns */
router.get('/categories', isUserLogged_1.isLogged, cat_controller_1.catsCategories);
/* Muestra los gatos filtrados. */
router.get('/filtercats', isUserLogged_1.isLogged, cat_controller_1.filterCats);
exports.default = router;
