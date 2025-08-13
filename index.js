import express from "express"
import dotenv from "dotenv"
import productsRoutes from "./routes/products.routes.js"
import usersRoutes from "./routes/users.routes.js"

import { dbConection } from "./database/dbConection.js"

const server = express()

const api = async () => {
    dotenv.config()
    await dbConection()
    
    server.use(express.json())
    
    server.use("/api/products", productsRoutes)
    server.use("/api/users", usersRoutes)
    
    server.listen(4000, () => console.log("El servidor esta corriendo en el puerto 4000 correctamente."))
}

api()