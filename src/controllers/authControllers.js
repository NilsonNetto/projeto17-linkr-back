import connection from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import joi from "joi";
dotenv.config();

export async function SignUp (req, res) {
    const {email, password, username, profilePicture} = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        username: joi.string().required(),
        profilePicture: joi.string().required()
    });
    const validation = userSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
        return
    }

    const expression = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const regex = new RegExp(expression);
    if (!profilePicture.match(regex)) {
        return res.status(422).send('URL inválida.');
    }

    const cryptoPassword = bcrypt.hashSync(password, 10);

    try {
        const alreadySigned = await connection.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email]);
        const getEmail = alreadySigned.rows.map(item => item.email);
        if (getEmail[0]) {
            return res.status(401).send('O usuário já foi cadastrado.');
        }

        const alreadyUsedUsername = await connection.query(`
            SELECT * FROM users WHERE username = $1;
        `, [username]);
        const getUsername = alreadyUsedUsername.rows.map(item => item.username);
        if (getUsername[0]) {
            return res.status(401).send('Escolha outro username esse já está sendo usado no momento.')
        }

        await connection.query(`
            INSERT INTO users (email, password, username, "profilePicture") VALUES ($1, $2, $3, $4);
        `, [email, cryptoPassword, username, profilePicture]);

        res.status(201).send('Usuário cadastrado.');
        
    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
}