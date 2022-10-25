import connection from "../db/db.js";

function insertNewComment({ comment, postId, userId }) {
  return connection.query(`INSERT INTO comments ("postId", "userId", comment) VALUES ($1, $2, $3);`, [postId, userId, comment]);
}

export { insertNewComment };