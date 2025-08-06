import mongoose from "mongoose"

export const dbConection = async () => {
    try {
        const mongoDB = await mongoose.connect(
            "mongodb+srv://marcosvidal:pass123eit@eit.zcivzrg.mongodb.net/store-eit"
        )
        console.log("Se conectó satisfactoriamente a la BD de: ", mongoDB.connections[0].name)
    } catch (error) {
        console.error("Error al conectar la BD.")
        throw Error(error)
    }
}