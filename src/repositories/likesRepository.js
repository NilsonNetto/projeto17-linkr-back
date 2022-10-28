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

const listLikes = async (postId) => {
  return (await connection.query(`
  SELECT
  l."userId",
  u.username
  FROM likes l 
  JOIN users u 
  ON l."userId" = u."id" 
  WHERE l."postId" = $1
  ORDER BY l.id DESC 
  `, [postId])).rows;
};

export { verifyLike, verifyPost, insertLike, deleteLike, listLikes };