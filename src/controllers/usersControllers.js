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
    const posts = await searchUserPosts(id);

    follow.rowCount === 0 ? (follow = false) : (follow = true);

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


    res.status(200).send({ username, userId, follow, posts });
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
