import { Response, Request } from "express";
import config from "../config/config";
import axios from "axios";
import Cat from "../models/cat";
import { CatInterface } from "../interfaces/catinterface";
import { catBreedsFn, catCategories } from "../utils/catLogic";
import { environment } from "../environments/environment.dev";
import { getCats } from "../utils/getCats";

export const cats = async (req: Request, res: Response): Promise<Response> => {
  let skip = 0;
  /* Comprueba si se le pasa algun parametro, en caso de que no, el skip será 0 */
  if (req.query.page !== "0") {
    //@ts-ignore
    skip = (req.query.page - 1) * 20;
  }

  /* Para la paginacion */
  let existingCats = await Cat.find().limit(20).skip(skip);

  if (existingCats.length > 0) {
    return res.status(200).json(existingCats);
  } else {
    let cats = await getCats();
    /* Promise.all para guardar cada uno de los elementos en mongo como documentos separados. */
    let cats_values = await Promise.all(
      cats.data.map(async (cat: CatInterface) => {
        return await new Cat(cat).save();
      })
    );

    /* Se realiza el slice ya que al momento de entrar el user por primer vez, el page siempre sera = 1,
    para ahorrar la peticion de mas, se usa el slice de arreglos.
    */
    cats_values = cats_values.slice(0, 20);

    return res.status(200).json(cats_values);
  }
};

/* Funcion creada para mostrar todos las razas y categorias 
y mapearlas en los dropdowns */
export const catsCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let existingCats = await Cat.find();

  let breeds = catBreedsFn(existingCats);

  let categories = catCategories(existingCats);

  return res.status(200).json({ breeds, categories });
};

export const filterCats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  /* Verifica si algun parametro está vacio. */
  if (!!!req.query.order || !!!req.query.breed || !!!req.query.category) {
    return res.status(400).json({ error: "Campo requerido" });
  }

  /* Filtro a todos los que tengan tanto la raza seleccionada o la categoria
    y se ordena por id (id de los gatos de thecatapi y no de mongodb).
  */
  let cats_filtered = await Cat.find({
    $or: [
      { breeds: { $elemMatch: { id: req.query.breed } } },
      { categories: { $elemMatch: { id: req.query.category } } },
    ],
  }).sort({ id: req.query.order === "desc" ? -1 : 1 });

  return res.status(200).json(cats_filtered);
};
