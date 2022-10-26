import connection from "../db/db.js";

const searchUserById = async (id) => {
  return (
    await connection.query(
      `
    SELECT 
    users.username 
    FROM users WHERE id=$1`,
      [id]
    )
  ).rows[0];
};

const searchUserPosts = async (id) => {
  return (
    await connection.query(
      `SELECT
      p.id ,
      p."userId",
      u.username,
      u."profilePicture",
      p.description,
      p.url,
        CASE WHEN EXISTS (SELECT * FROM likes l2 WHERE l2."userId" = $1 AND l2."postId" = p.id)  
        THEN TRUE
        ELSE FALSE 
      END AS "userLike" ,
      array_agg(u2.username) AS "postLikes"
    FROM posts p
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN users u2 ON l."userId" = u2.id
    WHERE u.id=$1
    GROUP BY p.id, u.username, u."profilePicture"
    ORDER BY p.id DESC
    LIMIT 20;`,
      [id]
    )
  ).rows;
};

const searchUser = async (name, userId) => {
  const user = (
    await connection.query(
      `SELECT users.id, users.username, users."profilePicture", followers."idFollowed" AS following
      FROM users 
      LEFT JOIN followers ON followers."idFollower"=$1 AND followers."idFollowed"=users.id
      WHERE users.username ILIKE '${name}%'
      ORDER BY following`,
      [userId]
    )
  ).rows;

  return user;
};
export { searchUserById, searchUserPosts, searchUser };
