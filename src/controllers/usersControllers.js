import {
  searchPageUser,
  searchUser,
} from "../repositories/userRepositories.js";

const showPageUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pageUser = await searchPageUser(id);

    res.status(200).send(pageUser);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const findUser = async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const user = await searchUser(name);

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { showPageUser, findUser };
