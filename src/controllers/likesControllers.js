import * as likesRepository from "../repositories/likesRepository.js";

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals;

  if (isNaN(postId)) {
    return res.sendStatus(400);
  }

  try {

    const postExists = await likesRepository.verifyPost(postId);

    if (!postExists) {
      return res.status(400).send('Post does not exists');
    }

    const isLiked = await likesRepository.verifyLike(postId, userId);

    if (isLiked) {
      return res.status(409).send('Post already liked by this user');
    }

    await likesRepository.insertLike(postId, userId);
    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals;

  if (isNaN(postId)) {
    return res.sendStatus(400);
  }

  try {

    const isLiked = await likesRepository.verifyLike(postId, userId);

    if (!isLiked) {
      return res.status(400).send('The post is not liked by this user');
    }

    await likesRepository.deleteLike(isLiked.id);
    return res.sendStatus(200);

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { likePost, unlikePost };