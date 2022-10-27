import dotenv from "dotenv";
import joi from "joi";
import { listFollow } from "../repositories/followRepository.js";
import urlMetadata from "url-metadata";
import { insertHashtag, insertPost, insertPostHashtag, listPublishedPost, listHashtag, listPosts,getFollowers, countPosts } from "../repositories/postRepository.js";

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

    await Promise.all(
      posts.map(async (post) => {
        try {
          const { title, description, image } = await (urlMetadata(post.url));
          post.metadata = {
            title,
            description,
            image
          };
        } catch (error) {
          console.log(error);
          post.metadata = {
            title: 'metadata error',
            description: 'metadata error',
            image: 'metadata error',
          };
        }
      })
    );

    return res.status(200).send(posts);

  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getNewPosts(req, res) {
  const userId = res.locals.userId;

  try {
    const newPosts = await countPosts(userId);

    return res.status(200).send(newPosts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { publishPost, getPosts, getNewPosts };
