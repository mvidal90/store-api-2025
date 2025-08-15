import * as bcrypt from "bcrypt"
import { User } from "../models/User.js";
import { generateJWT } from "../utils/jwt.js";

export const createUser = async (req, res) => {
    const {password, ...user} = req.body;

    try {
        const findUser = await User.findOne({ email: user.email })

        if (findUser) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con este email."
            })
        }

        const passHash = await bcrypt.hash(password, 10)

        const newUser = await User.create({...user, password: passHash})

        const {password: pass2, ...resUser} = newUser._doc

        const jwt = generateJWT(newUser._id)

        res.json({
            ok: true,
            user: resUser,
            jwt
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}

export const login = async (req, res) => {

    try {
        
        const user = await User.findOne({ email: req.body.email})

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "No encontrado, el usuario."
            })
        }

        const validatePassword = bcrypt.compareSync(req.body.password, user._doc?.password)

        if (!validatePassword) {
            return res.status(403).json({
                ok: false,
                msg: "Prohibido, Credenciales incorrectas."
            })
        }

        const jwt = generateJWT(user._doc._id)

        const {password, ...restUser} = user._doc

        res.json({
            ok: true,
            user: restUser,
            jwt
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}