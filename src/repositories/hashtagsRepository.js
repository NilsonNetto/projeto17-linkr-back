import connection from "../db/db.js";

const listTrendingHashtags = async () => {
  const trendingHashtags = await connection.query(`
  SELECT
  h.id, 
  h."name", 
  COUNT(ph."hashtagId") AS "hashtagCount" 
  FROM hashtags h 
  JOIN "postsHashtags" ph 
  ON ph."hashtagId" = h.id 
  GROUP BY h."id" 
  ORDER BY "hashtagCount" DESC 
  LIMIT 10; ;
  `);

  return trendingHashtags;
};

const listPostsWithHashtag = async (hashtag) => {
  return (
    await connection.query(
      `
    SELECT
      p.id ,
      p."userId",
      u.username,
      u."profilePicture",
      p.description,
      p.url
    FROM posts p
    JOIN users u ON p."userId" = u.id
    LEFT JOIN likes l ON l."postId" = p.id
    LEFT JOIN users u2 ON l."userId" = u2.id
    JOIN "postsHashtags" ph ON ph."postId" = p.id
    JOIN hashtags h ON h.id =ph."hashtagId" 
    WHERE h.name = $1
    GROUP BY p.id, u.username, u."profilePicture"
    ORDER BY p.id DESC
    LIMIT 20;
    `,
      [hashtag]
    )
  ).rows;
};

export { listTrendingHashtags, listPostsWithHashtag };
