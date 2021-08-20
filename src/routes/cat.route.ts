
import { Router } from "express";
import { cats, catsCategories, filterCats } from '../controllers/cat.controller'
import { isLogged } from '../utils/isUserLogged' 

const router = Router();

/* Lista todos los gatos */
router.get("/cats", isLogged, cats);
/* Lista las categorias que se mapearan en los dropdowns */
router.get('/categories', isLogged, catsCategories)
/* Muestra los gatos filtrados. */
router.get('/filtercats', isLogged, filterCats)

export default router