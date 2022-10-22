import connection from "../db/db.js";

const verifyLike = async (postId, userId) => {
  return (await connection.query(`
  SELECT *
  FROM likes
  WHERE 
  "postId" = $1 AND 
  "userId" = $2;
  `, [postId, userId])).rows[0];
};

const verifyPost = async (postId) => {
  return (await connection.query(`
  SELECT id
  FROM posts
  WHERE
  id = $1;
  `, [postId])).rows[0];
};

const insertLike = async (postId, userId) => {
  return await connection.query(`
  INSERT 
  INTO likes
  ("postId", "userId")
  VALUES ($1, $2);
  `, [postId, userId]);
};

const deleteLike = async (likeId) => {
  return await connection.query(`
  DELETE 
  FROM likes 
  WHERE 
  id = $1;
  `, [likeId]);
};

export { verifyLike, verifyPost, insertLike, deleteLike };