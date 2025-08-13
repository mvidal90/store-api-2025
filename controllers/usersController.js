import * as bcrypt from "bcrypt"
import { User } from "../models/User.js";

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

        res.json({
            ok: true,
            user: resUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: "Error internal server"
        })
    }
}