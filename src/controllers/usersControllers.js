import urlMetadata from "url-metadata";
import {
  searchUserById,
  searchUserPosts,
  searchUser,
} from "../repositories/userRepository.js";
import { listFollow } from "../repositories/followRepository.js";

const showPageUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const { username } = await searchUserById(id);
    let follow = await listFollow(userId, id);
    const userPosts = await searchUserPosts(id);

    const postsWithMetadatas = [];

    follow.rowCount === 0 ? (follow = false) : (follow = true);

    for (let i = 0; i < userPosts.length; i++) {
      const metadata = await urlMetadata(userPosts[i].url);

      postsWithMetadatas.push({
        ...userPosts[i],
        metadata: {
          title: metadata.title,
          description: metadata.description,
          image: metadata.image,
        },
      });
    }

    res.status(200).send({ username, follow, posts: postsWithMetadatas });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const findUser = async (req, res) => {
  const { name } = req.params;
  const userId = res.locals.userId;
  try {
    const user = await searchUser(name, userId);

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { showPageUser, findUser };
