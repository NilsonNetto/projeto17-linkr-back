import urlMetadata from "url-metadata";
import { listTrendingHashtags, listPostsWithHashtag } from "../repositories/hashtagsRepository.js";

const getHashtags = async (req, res) => {

  try {

    const trendingHashtags = await listTrendingHashtags();

    res.send(trendingHashtags.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getPostsWithHashtag = async (req, res) => {
  const { hashtag } = req.params;

  try {

    const posts = await listPostsWithHashtag(hashtag);

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

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export { getHashtags, getPostsWithHashtag };