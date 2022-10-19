import { listTrendingHashtags, listPostsWithHashtag } from "../repositories/hashtagsRepository.js";

const getTrendingHashtags = async (req, res) => {

  try {

    const trendingHashtags = await listTrendingHashtags();

    res.send(trendingHashtags.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

};

const getHashtag = async (req, res) => {
  const { hashtag } = req.params;

  try {

    const postsWithHashtag = await listPostsWithHashtag(hashtag);

    res.send(postsWithHashtag.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { getTrendingHashtags, getHashtag };