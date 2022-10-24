import connection from "../db/db.js";

const searchPageUser = async (id) => {
  const user = (
    await connection.query(`SELECT users.username FROM users WHERE id=$1`, [id])
  ).rows[0];
  const pageUser = (
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
  const postUser = { username: user.username, posts: pageUser };
  return postUser;
};

const searchUser = async (name) => {
  const user = (
    await connection.query(
      `SELECT users.id, users.username, users."profilePicture"
    FROM users WHERE users.username ILIKE '${name}%'`
    )
  ).rows;

  return user;
};
export { searchPageUser, searchUser };
