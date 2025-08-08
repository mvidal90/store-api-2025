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

export const getProductById = async (req, res) => {

    const { id } = req.params

    try {
        const prod = await Product.findById(id)

        res.json({
            ok: true,
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

export const editById = async (req, res) => {
    const { params: { id }, body } = req
    
    try {
        const prod = await Product.findById(id)

        if (!prod) {
            return res.status(404).json({
                ok: false,
                msg: "El producto no existe."
            })
        }

        const newProduct = await Product.findByIdAndUpdate(id, body, {new: true})

        res.json({
            ok: true,
            msg: "Producto modificado correctamente",
            product: newProduct
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}

export const editOrCreate = async (req, res) => {
    const { body: { _id, ...restBody } } = req
    
    try {
        const prod = await Product.findById(_id)

        if (prod) {
            const newProduct = await Product.findByIdAndUpdate(
                _id, 
                restBody, 
                {new: true}
            )
    
            return res.json({
                ok: true,
                msg: "Producto modificado correctamente",
                product: newProduct
            })
        }

        const newProd = await Product.create(restBody)

        if (!newProd) {
            return res.status(400).json({
                ok: false,
                msg: "El producto no se ha creado correctamente."
            })
        }

        res.json({
            ok: true,
            msg: "Producto creado correctamente",
            product: newProd
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}

export const deleteById = async (req, res) => {
    const { params: { id } } = req
    
    try {
        const prod = await Product.findById(id)

        if (!prod) {
            return res.status(404).json({
                ok: false,
                msg: "El producto no existe."
            })
        }

        await Product.findByIdAndDelete(id)

        res.json({
            ok: true,
            msg: "Producto eliminado correctamente",
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}