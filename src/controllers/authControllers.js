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
    }
}

export async function SignIn (req, res) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(422).send('Preencha os campos corretamente.');
    }

    const chaveSecreta = process.env.TOKEN_SECRET;

    try {
        const findUser = await connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        const getEmailValidation = findUser.rows.map(item => item.email);
        const getUserPassword = findUser.rows.map(item => item.password);
        const getUserId = findUser.rows.map(item => item.id);

        const dados = {userId: getUserId[0]};
        const token = jwt.sign(dados, chaveSecreta, { expiresIn: 60*60*24*30 });
       
        if (!getEmailValidation[0]) {
            return res.status(401).send('Senha ou e-mail incorretos.');
        }
        if (!bcrypt.compareSync(password, getUserPassword[0])) {
            return res.status(401).send('Senha ou e-mail incorretos.');
        }

        await connection.query(`
            INSERT INTO sessions ("userId", token) VALUES ($1, $2);
        `, [getUserId[0], token]);

        res.status(200).send({token});

    } catch (error) {
        res.sendStatus(500);
    }
}