import { serverErrorResponse } from "../controllers/controllerHelper.js";
import { insertNewEditPost } from "../repositories/editPostRepository.js";

async function putPost(req, res) {
  const { newPost, postId } = req.body;

  try {
    await insertNewEditPost({ newPost, postId });
    return res.sendStatus(201);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { putPost };
