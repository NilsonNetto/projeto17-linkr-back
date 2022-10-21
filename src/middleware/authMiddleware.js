import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import connection from '../db/db.js';
dotenv.config();

export async function userLogged(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifyToken) {
        return res.sendStatus(401);
    }
    
    const isValidToken  = await connection.query(
        'SELECT "userId" FROM sessions WHERE "userId" = $1 AND token = $2 AND  valid = TRUE',
        [verifyToken.userId, token]);
    if (isValidToken.rowCount === 0) {
        return res.sendStatus(401);
    }
    
    res.locals.userId = verifyToken.userId;

    next();
}