import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository.js";
dotenv.config();

export async function Authorization (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const chaveSecreta = process.env.TOKEN_SECRET;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const dados = jwt.verify(token, chaveSecreta);
        
        const findUser = await authRepository.getUserById({userId: dados.userId});

        if (!findUser.rows[0].id) {
            return res.status(404).send('O usuário não foi encontrado.');
        }

        res.locals.user = findUser;
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}