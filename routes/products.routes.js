import express from "express"
import { body } from "express-validator"

import { createProduct, getProducts } from "../controllers/productsController.js"
import { validationErrorResponse } from "../middlewares/validateResponse.js"

const route = express.Router()

route
    .get("/", getProducts)
    .post("/", [
        body("name").isString().isLength({ min: 1 }).withMessage("El nombre es requerido."),
        body("amount").isFloat({ gt: 0 }).withMessage("El monto es requerido."),
        body("brand").isString().isLength({ min: 1 }).withMessage("La marca es requerida."),
        validationErrorResponse
    ], createProduct)

export default route