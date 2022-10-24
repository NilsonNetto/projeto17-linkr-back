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
    const postsWithMetadatas = [];

    for (let i = 0; i < postsWithHashtags.length; i++) {
      const metadata = await urlMetadata(postsWithHashtags[i].url);

      postsWithMetadatas.push({
        ...postsWithHashtags[i],
        metadata: {
          title: metadata.title,
          description: metadata.description,
          image: metadata.image
        }
      });
    }


    res.send(postsWithMetadatas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export { getHashtags, getPostsWithHashtag };