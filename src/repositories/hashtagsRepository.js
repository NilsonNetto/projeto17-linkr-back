import connection from "../db/db.js";

const listTrendingHashtags = async () => {
  return connection.query(`
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
};

const listPostsWithHashtag = async (hashtag) => {
  return connection.query(`
  SELECT 
  p.*,
  h.name 
  FROM posts p
  JOIN "postsHashtags" ph
  ON ph."postId" = p.id
  JOIN hashtags h
  ON ph."hashtagId" = h.id
  WHERE h.name = $1
  LIMIT 20
  `, [hashtag]);
};

export { listTrendingHashtags, listPostsWithHashtag };
