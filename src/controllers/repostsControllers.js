import connection from "../db/db.js";

export async function Reposts (req, res) {
    const { id } = req.body;

    const userId = res.locals.userId;

    if (!id) {
        return res.status(422).send("Id do post não foi enviado.");
    }

    try {
        const getId = await connection.query(`
        SELECT posts."userId", users.id, posts.id AS "postId" FROM posts 
        JOIN users ON posts."userId"=users.id
        WHERE posts.id = $1;
        `, [id]);

        if (!getId.rows[0].postId) {
            return res.status(404).send("Post inexistente.");
        }

        const userIdConfirmation = await connection.query(`
            SELECT id FROM users WHERE id = $1;
        `, [userId]);

        await connection.query(`
            INSERT INTO reposts ("postId", "userId") VALUES ($1, $2);
        `, [getId.rows[0].postId, userIdConfirmation.rows[0].id]);

        res.status(201).send("O repost foi concluido.");

    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
}