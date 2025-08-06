import express from "express"

import productsRoutes from "./routes/products.routes.js"
import { dbConection } from "./database/dbConection.js"

const server = express()

const api = async () => {
    await dbConection()
    
    server.use(express.json())
    
    server.use("/api/products", productsRoutes)
    
    server.listen(4000, () => console.log("El servidor esta corriendo en el puerto 4000 correctamente."))
}

api()