import { validatePostRepository } from "../repositories/postRepository.js";
import { serverErrorResponse } from "../controllers/controllerHelper.js";

async function validadePost(req, res, next) {
  const { postId, userId } = req.body;

  try {
    const postRegistered = await validatePostRepository(postId, userId);
    if (postRegistered.rowCount === 0) {
      return res.status(400).send("Not authorized");
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
  next();
}

export { validadePost };
