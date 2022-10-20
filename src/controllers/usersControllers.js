import { searchPageUser } from "../repositories/userRepositories.js";

const showPageUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pageUser = searchPageUser(id);
    res.status(200).send(pageUser);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { showPageUser };
