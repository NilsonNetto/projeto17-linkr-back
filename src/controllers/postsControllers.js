import dotenv from "dotenv";
import joi from "joi";
import urlMetadata from "url-metadata";
import { insertHashtag, insertPost, insertPostHashtag, listPublishedPost, listHashtag, listPosts } from "../repositories/postRepository.js";
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
    let hashtags = description.split(' ').filter(v => v.startsWith('#'));
    hashtags = hashtags.map(hashtag => hashtag.replace("#", ""));
    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagExist = await listHashtag(hashtags[i]);
        if (hashtagExist.rowCount === 0) {
          await insertHashtag(hashtags[i]);
        }
      }
    }

    const postId = await insertPost(userId, description, link);

    const published = await listPublishedPost(postId);

    //INSERINDO NA TABELA POSTSHASHTAGS
    if (hashtags.length > 0) {
      for (let i = 0; i < hashtags.length; i++) {
        const hashtagId = await listHashtag(hashtags[i]);
        await insertPostHashtag(postId, hashtagId);
      }
    }

    res.status(200).send(published.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPosts(req, res) {
  const userId = res.locals.userId;
  console.log(userId);

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
