import connection from "../db/db.js";

const searchPageUser = async (id) => {
  const pageUser = (
    await connection.query(
      `SELECT
      p.id ,
      u.username,
      u."profilePicture",
      p.description,
      p.url,
      COUNT(u2.username) AS "postLikes"
    FROM posts p
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN users u2 ON l."userId" = u2.id
    WHERE u.id = $1
    GROUP BY p.id, u.username, u."profilePicture"`,
      [id]
    )
  ).rows;

  return pageUser;
};

export { searchPageUser };
