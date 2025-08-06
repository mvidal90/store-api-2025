import { Product } from "../models/Products.js"


export const getProducts = async (req, res) => {
    try {
        const prods = await Product.find()

        res.json({
            ok: true,
            products: prods
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}

export const createProduct = async (req, res) => {
    const { body } = req
    
    try {
        const prod = await Product.create(body)

        if (!prod) {
            return res.status(400).json({
                ok: false,
                msg: "El producto no se ha creado correctamente."
            })
        }

        res.json({
            ok: true,
            msg: "Producto creado correctamente",
            product: prod
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}