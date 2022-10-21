import connection from "../db/db.js";

function insertNewEditPost({ newPost, postId }) {
  return connection.query(`UPDATE posts SET description = $1 WHERE id = $2;`, [
    newPost,
    postId,
  ]);
}

export { insertNewEditPost };
