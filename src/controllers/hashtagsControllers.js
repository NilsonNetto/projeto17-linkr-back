import { listTrendingHashtags } from "../repositories/hashtagsRepository.js";

const getHashtags = async (req, res) => {

  try {

    const trendingHashtags = await listTrendingHashtags();

    res.send(trendingHashtags.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

};

export { getHashtags };