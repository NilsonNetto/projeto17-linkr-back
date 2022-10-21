import connection from "../db/db.js";

function deletePostById(postId) {
  return connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
}

export { deletePostById };
