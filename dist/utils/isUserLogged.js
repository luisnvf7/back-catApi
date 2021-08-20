"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = void 0;
const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        /* En caso de que el usuario no este logeado, llevame al endpoint de error */
        res.redirect("http://localhost:3000/error");
    }
};
exports.isLogged = isLogged;
