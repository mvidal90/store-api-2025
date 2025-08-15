import express from "express"
import { body, param } from "express-validator"

import { createProduct, deleteById, editById, editOrCreate, getProductById, getProducts } from "../controllers/productsController.js"
import { validationErrorResponse } from "../middlewares/validateResponse.js"
import { validateJWT } from "../middlewares/validateJWT.js"

const route = express.Router()

route
    .get("/", getProducts)
    .get("/byId/:id", [
        param("id").isMongoId().withMessage("El ID es incorrecto."),
        validationErrorResponse
    ], getProductById)
    .post("/", [
        validateJWT,
        body("name").isString().isLength({ min: 1 }).withMessage("El nombre es requerido."),
        body("amount").isFloat({ gt: 0 }).withMessage("El monto es requerido."),
        body("brand").isString().isLength({ min: 1 }).withMessage("La marca es requerida."),
        validationErrorResponse,
    ], createProduct)
    .patch(
        "/edit/:id", [
            param("id").isMongoId().withMessage("El ID es incorrecto."),
            validationErrorResponse
        ],
        editById
    )
    .put("/", [
        body("name").isString().isLength({ min: 1 }).withMessage("El nombre es requerido."),
        body("amount").isFloat({ gt: 0 }).withMessage("El monto es requerido."),
        body("brand").isString().isLength({ min: 1 }).withMessage("La marca es requerida."),
        validationErrorResponse
    ], editOrCreate)
    .delete("/delete/:id", [
        param("id").isMongoId().withMessage("El ID es incorrecto."),
        validationErrorResponse
    ],
    deleteById)

export default route