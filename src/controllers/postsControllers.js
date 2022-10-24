import connection from "../db/db.js";
import dotenv from "dotenv";
import joi from "joi";
import urlMetadata from "url-metadata";
import { insertHashtag, insertPost, insertPostHashtag, listHashtag, listPosts } from "../repositories/postRepository.js";
dotenv.config();

async function publishPost(req, res) {
  const userId = res.locals.userId;

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
    const hashtags = description.split(' ').filter(v => v.startsWith('#'));

    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagExist = listHashtag(hashtags[i]);
        if (hashtagExist.rowCount === 0) {
          insertHashtag(hashtags[i]);
        }
      }
    }

    const postId = insertPost(userId, description, link);

    const published = listPublishedPost(postId);

    //INSERINDO NA TABELA POSTSHASHTAGS
    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagId = listHashtag([hashtags[i]]);
        insertPostHashtag(postId, hashtagId);
      }
    }

    res.status(200).send(published.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPosts(req, res) {
  const userId = res.locals.userId;

  try {
    const posts = await listPosts(userId);
    const postsWithMetadatas = [];

    for (let i = 0; i < posts.length; i++) {
      const metadata = await urlMetadata(posts[i].url);

      postsWithMetadatas.push({
        ...posts[i],
        metadata: {
          title: metadata.title,
          description: metadata.description,
          image: metadata.image
        }
      });
    }

    return res.status(200).send(postsWithMetadatas);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { publishPost, getPosts };
