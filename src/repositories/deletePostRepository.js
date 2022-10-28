import connection from "../db/db.js";

function deletePost(postId) {
  return connection.query(`DELETE FROM posts WHERE id = $1;`, [postId]);
}

function deleteLikes(postId) {
  return connection.query(`DELETE FROM likes WHERE "postId" = $1;`, [postId]);
}

function deletePostHashtags(postId) {
  return connection.query(`DELETE FROM "postsHashtags" WHERE "postId" = $1;`, [
    postId,
  ]);
}

function deleteComments(postId) {
  return connection.query(`DELETE FROM comments WHERE "postId" = $1;`, [
    postId,
  ]);
}

function deleteReposts(postId) {
  return connection.query(`DELETE FROM reposts WHERE "postId" = $1;`, [postId]);
}

export {
  deletePost,
  deleteLikes,
  deletePostHashtags,
  deleteComments,
  deleteReposts,
};
