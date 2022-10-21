import connection from "../db/db.js";

function deletePostById(postId) {
  return connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
}

function deleteLikesByPostId(postId) {
  return connection.query(`DELETE FROM likes WHERE "postId" = $1;`, [postId]);
}

function deletePostHashtagsByPostId(postId) {
  return connection.query(`DELETE FROM "postsHashtags" WHERE "postId" = $1;`, [
    postId,
  ]);
}

export { deletePostById, deleteLikesByPostId, deletePostHashtagsByPostId };
