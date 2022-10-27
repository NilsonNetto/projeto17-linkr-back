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
  const { userId } = res.locals;

  try {

    const postsWithHashtags = await listPostsWithHashtag(userId, hashtag);

    res.send(postsWithHashtags);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export { getHashtags, getPostsWithHashtag };