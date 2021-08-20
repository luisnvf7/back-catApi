import { CatInterface, Body } from "../interfaces/catinterface";

/* Funcion encargada de agarrar los gatos y filtrar todas las razas que estan disponible en la peticion
    Con la finalidad de que no aparezca en el front, alguna raza que no esté dentro de la base de datos.
*/
export const catBreedsFn = (cats: CatInterface[]) => {
  let availableBreeds = cats.map((cat: CatInterface) => {
    return {
      id: cat.breeds[0]?.id,
      name: cat.breeds[0]?.name,
    };
  });
  return availableBreeds.filter(
    (breed, i, arr) =>
      arr.findIndex((v: Body) => v?.id === breed?.id) == i && breed.id
  );
};

/* Funcion que se encargar de filtrar y listar todas las categorias disponibles obtenidas de la api de cat. */
export const catCategories = (cats: CatInterface[]) => {
  let availableCategories = cats.map((cat: CatInterface) => {
    return {
      id: cat.categories[0]?.id,
      name: cat.categories[0]?.name,
    };
  });

  return availableCategories.filter(
    (category, i, arr) =>
      arr.findIndex((v: Body) => v?.id === category?.id) === i && category.id
  );
};
