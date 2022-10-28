import connection from "../db/db.js";

async function validatePostRepository({ postId, userId }) {
  return connection.query(
    `SELECT * FROM posts WHERE id = $1 AND "userId" = $2;`,
    [postId, userId]
  );
}

async function listHashtag(hashtag) {
  return await connection.query(
    `SELECT
      id 
      FROM hashtags 
      WHERE name = $1`,
    [hashtag]
  );
}

async function insertHashtag(hashtag) {
  return await connection.query(
    `INSERT INTO hashtags 
      (name) 
      VALUES ($1)`,
    [hashtag]
  );
}

async function insertPost(userId, description, link) {
  return (
    await connection.query(
      `INSERT INTO posts
    ("userId", description, url) 
    VALUES ($1, $2, $3) 
    RETURNING id;`,
      [userId, description, link]
    )
  ).rows[0].id;
}

async function listPublishedPost(postId) {
  return await connection.query(
    `SELECT
      id AS "postId", 
      description, 
      url 
      FROM posts 
      WHERE id = $1;`,
    [postId]
  );
}

async function insertPostHashtag(postId, hashtagId) {
  return await connection.query(
    `
    INSERT INTO "postsHashtags" 
    ("postId", "hashtagId") 
    VALUES ($1, $2);`,
    [postId, hashtagId.rows[0].id]
  );
}

async function listPosts(userId) {
  return (
    await connection.query(
      `
     SELECT
      p.id ,
      p."userId",  
      u.username,
      u."profilePicture",
      p.description,
      followers."idFollowed" AS following,
      p.url
    FROM posts p
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN followers ON followers."idFollower"=$1 AND followers."idFollowed"=u.id
    WHERE followers."idFollowed" IS NOT NULL OR p."userId" = $1
    GROUP BY p.id, u.username, u."profilePicture", followers."idFollowed"
    ORDER BY p.id DESC
    LIMIT 20;
    `,
      [userId]
    )
  ).rows;
}

async function getFollowers(userId) {
  return (
    await connection.query(
      `
  SELECT * FROM followers WHERE "idFollower"=$1
    `,
      [userId]
    )
  ).rows;
}

async function countPosts(userId) {
  return (
    await connection.query(
      'SELECT COUNT(posts.id) FROM posts JOIN followers f ON posts."userId" = f."idFollowed" WHERE f."idFollower" = $1',
      [userId]
    )
  ).rows[0].count;
}

export {
  validatePostRepository,
  listHashtag,
  insertHashtag,
  insertPost,
  listPublishedPost,
  insertPostHashtag,
  listPosts,
  getFollowers,
  countPosts
};
