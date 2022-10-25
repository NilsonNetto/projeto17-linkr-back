import { listFollow, insertFollow, deleteFollow } from "../repositories/followRepository.js";

const followUser = async (req, res) => {
  const { userId } = res.locals;
  const followedId = Number(req.params.userId);

  if (isNaN(followedId)) {
    return res.status(400).send('user id is not a number');
  }

  try {

    const verifyFollow = await listFollow(userId, followedId);

    if (verifyFollow.rows[0]) {
      return res.status(409).send('You already follow this user');
    }

    await insertFollow(userId, followedId);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const unfollowUser = async (req, res) => {
  const { userId } = res.locals;
  const followedId = Number(req.params.userId);

  if (isNaN(followedId)) {
    return res.status(400).send('user id is not a number');
  }

  try {
    const followId = await listFollow(userId, followedId);

    if (followId.rowCount === 0) {
      return res.status(400).send('You dont follow this user');
    }

    await deleteFollow(followId.rows[0].id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export { followUser, unfollowUser };