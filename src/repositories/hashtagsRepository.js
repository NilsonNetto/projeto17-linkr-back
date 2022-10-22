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

const listPostsWithHashtag = async (userId, hashtag) => {
  return (
    await connection.query(
      `
    SELECT
      p.id ,
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
    JOIN "postsHashtags" ph ON ph."postId" = p.id
    JOIN hashtags h ON h.id =ph."hashtagId" 
    WHERE h.name = $2
    GROUP BY p.id, u.username, u."profilePicture"
    ORDER BY p.id DESC;
    `,
      [userId, hashtag]
    )
  );
};

export { listTrendingHashtags, listPostsWithHashtag };
