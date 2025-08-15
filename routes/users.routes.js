import express from "express"
import { body } from "express-validator"

import { validationErrorResponse } from "../middlewares/validateResponse.js"
import { createUser, login } from "../controllers/usersController.js"

const route = express.Router()

route
    .post("/", [
        body("name").isString().isLength({ min: 1 }).withMessage("El nombre es requerido."),
        body("lastName").isString().isLength({ min: 1 }).withMessage("El apellido es requerido."),
        body("email").isEmail().withMessage("El email es requerido o no tiene el formato correcto."),
        body("password").isString().isLength({ min: 8 }).withMessage("La password es requerida."),
        validationErrorResponse
    ], createUser)
    .post("/login",[
        body("email").isEmail().withMessage("El email es requerido o no tiene el formato correcto."),
        body("password").isString().isLength({ min: 8 }).withMessage("La password es requerida."),
        validationErrorResponse
    ], login)

export default route