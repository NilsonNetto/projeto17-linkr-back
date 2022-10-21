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

export { listTrendingHashtags };
