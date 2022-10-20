import connection from "../db/db.js";

async function validatePostRepository(postId, userId) {
  return connection.query(`SELECT * FROM posts WHERE id = $1 AND "userId" = $2;`, [
    postId,
    userId,
  ]);
}

export { validatePostRepository };
