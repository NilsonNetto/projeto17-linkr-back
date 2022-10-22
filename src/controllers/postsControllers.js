import connection from "../db/db.js";
import dotenv from "dotenv";
import joi from "joi";
dotenv.config();

async function publishPost(req, res) {
  //COMO USUÁRIO LOGADO - MIDDLEWARE
  const userId = res.locals.userId;

  //QUERO PUBLICAR UM POST
  const { description, link } = req.body;

  //VALIDAÇÃO - SE TEM LINK A SER PUBLICADO (SCHEMA)
  const postSchema = joi.object({
    description: joi.string(),
    link: joi
      .string()
      .pattern(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      )
      .required(),
  });

  const { error } = postSchema.validate(req.body);
  if (error !== undefined) {
    return res.status(422).send(error.details.map((detail) => detail.message));
  }

  //VERIFICAÇÃO DAS HASHTAGS

  try {
    await connection.query(
      'INSERT INTO posts ("userId", description, url) VALUES ($1, $2, $3)',
      [userId, description, link]
    );
    const published = await connection.query(
      'SELECT id AS "postId", description, url FROM posts WHERE description = $1 AND url = $2',
      [description, link]
    );

    res.status(200).send(published.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPosts(req, res) {
  //COMO USUÁRIO LOGADO - MIDDLEWARE
  const userId = res.locals.userId;

  //QUERO VER OS POSTS DA MINHA TIMELINE
  try {
    const posts = (await listPosts()).reverse();

    if (posts.length > 20) {
      let postsLimited = [];
      for (let i = 0; i < 20; i++) {
        postsLimited.push(posts[i]);
      }
      return res.status(200).send(postsLimited);
    }

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const listPosts = async (userId) => {
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
    GROUP BY p.id, u.username, u."profilePicture"
    ORDER BY p.id;
    `,
      [userId]
    )
  ).rows;
};

export { publishPost, getPosts };
