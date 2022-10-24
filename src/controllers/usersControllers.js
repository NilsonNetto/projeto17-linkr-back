import urlMetadata from "url-metadata";
import { searchUserById, searchUserPosts, searchUser } from "../repositories/userRepository.js";

const showPageUser = async (req, res) => {
  const { id } = req.params;

  try {
    const username = await searchUserById(id);
    const userPosts = await searchUserPosts(id);

    const postsWithMetadatas = [];

    for (let i = 0; i < userPosts.length; i++) {
      const metadata = await urlMetadata(userPosts[i].url);

      postsWithMetadatas.push({
        ...userPosts[i],
        metadata: {
          title: metadata.title,
          description: metadata.description,
          image: metadata.image
        }
      });
    }

    res.status(200).send({ username, posts: postsWithMetadatas });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const findUser = async (req, res) => {
  const { name } = req.params;

  try {
    const user = await searchUser(name);

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { showPageUser, findUser };
