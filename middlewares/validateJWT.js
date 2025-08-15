import jwt from "jsonwebtoken"
import { User } from "../models/User.js";

export const validateJWT = async (req, res, next) => {
    const token = req.headers["x-token"];
    try {
        const payload = jwt.verify(
            token,
            process.env.SEED_SECRET
        )

        if (!payload.id) {
            return res.status(401).json({
                ok: false,
                msg: "No autorizado, token incorrecto."
            })
        }

        const user = await User.findById(payload.id);

        if (!user) {
            return res.status(403).json({
                ok: false,
                msg: "Prohibido, usuario incorrecto."
            })
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(403).json({
            ok: false,
            msg: "Prohibido, hubo un error.",
            error
        })
    }
}