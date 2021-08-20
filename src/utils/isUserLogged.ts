import { Response, Request, NextFunction } from "express";

export const isLogged = (req: Request, res : Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        /* En caso de que el usuario no este logeado, llevame al endpoint de error */
        res.redirect("http://localhost:3000/error")
    }
}