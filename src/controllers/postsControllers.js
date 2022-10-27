import connection from "../db/db.js";
import dotenv from "dotenv";
import joi from "joi";
import { getFollowers, listPosts } from "../repositories/postRepository.js";
import { listFollow } from "../repositories/followRepository.js";
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

  try {
    //VERIFICAÇÃO DAS HASHTAGS - ADICIONAR QND NÃO EXISTIR
    const hashtags = description.split(" ").filter((v) => v.startsWith("#"));

    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagExist = await connection.query(
          "SELECT id FROM hashtags WHERE name = $1",
          [hashtags[i]]
        );
        if (hashtagExist.rowCount === 0) {
          await connection.query("INSERT INTO hashtags (name) VALUES ($1)", [
            hashtags[i],
          ]);
        }
      }
    }

    const post = await connection.query(
      'INSERT INTO posts ("userId", description, url) VALUES ($1, $2, $3) RETURNING id',
      [userId, description, link]
    );
    const postId = post.rows[0].id;

    const published = await connection.query(
      'SELECT id AS "postId", description, url FROM posts WHERE id = $1',
      [postId]
    );

    //INSERINDO NA TABELA POSTSHASHTAGS
    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagId = await connection.query(
          "SELECT id FROM hashtags WHERE name = $1",
          [hashtags[i]]
        );
        await connection.query(
          'INSERT INTO "postsHashtags" ("postId", "hashtagId") VALUES ($1, $2)',
          [postId, hashtagId.rows[0].id]
        );
      }
    }

    res.status(200).send(published.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPosts(req, res) {
  //COMO USUÁRIO LOGADO - MIDDLEWARE
  const userId = res.locals.userId;

  //QUERO VER OS POSTS DA MINHA TIMELINE
  const follower = await getFollowers(userId);
  if (!follower.length > 0) {
    res.status(200).send({
      message: "You don't follow anyone yet. Search for new friends!",
    });
    return;
  }
  try {
    const posts = await listPosts(userId);

    return res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { publishPost, getPosts };
