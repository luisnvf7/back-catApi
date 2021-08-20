"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catCategories = exports.catBreedsFn = void 0;
/* Funcion encargada de agarrar los gatos y filtrar todas las razas que estan disponible en la peticion
    Con la finalidad de que no aparezca en el front, alguna raza que no esté dentro de la base de datos.
*/
const catBreedsFn = (cats) => {
    let availableBreeds = cats.map((cat) => {
        var _a, _b;
        return {
            id: (_a = cat.breeds[0]) === null || _a === void 0 ? void 0 : _a.id,
            name: (_b = cat.breeds[0]) === null || _b === void 0 ? void 0 : _b.name,
        };
    });
    return availableBreeds.filter((breed, i, arr) => arr.findIndex((v) => (v === null || v === void 0 ? void 0 : v.id) === (breed === null || breed === void 0 ? void 0 : breed.id)) == i && breed.id);
};
exports.catBreedsFn = catBreedsFn;
/* Funcion que se encargar de filtrar y listar todas las categorias disponibles obtenidas de la api de cat. */
const catCategories = (cats) => {
    let availableCategories = cats.map((cat) => {
        var _a, _b;
        return {
            id: (_a = cat.categories[0]) === null || _a === void 0 ? void 0 : _a.id,
            name: (_b = cat.categories[0]) === null || _b === void 0 ? void 0 : _b.name,
        };
    });
    return availableCategories.filter((category, i, arr) => arr.findIndex((v) => (v === null || v === void 0 ? void 0 : v.id) === (category === null || category === void 0 ? void 0 : category.id)) === i && category.id);
};
exports.catCategories = catCategories;
