import connection from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import joi from "joi";
dotenv.config();

async function publishPost (req, res) {
//COMO USUÁRIO LOGADO - MIDDLEWARE
    const userId = res.locals.userId;

//QUERO PUBLICAR UM POST
    const { description, link } = req.body;

    //VALIDAÇÃO - SE TEM LINK A SER PUBLICADO (SCHEMA)
    const postSchema = joi.object({
        description: joi.string(),
        link: joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).required()
    });

    const { error } = postSchema.validate(req.body, {abortEarly: false});
    if (error !== undefined) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    //VERIFICAÇÃO DAS HASHTAGS

    try {
        await connection.query('INSERT INTO posts ("userId", description, url) VALUES ($1, $2, $3)', [userId, description, link]);
        const published = await connection.query('SELECT id AS "postId", description, url FROM posts WHERE description = $1 AND url = $2', [description, link]);

        res.status(200).send(published.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { publishPost };