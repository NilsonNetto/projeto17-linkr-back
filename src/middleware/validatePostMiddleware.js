import { validatePostRepository } from "../repositories/postRepository.js";
import { serverErrorResponse } from "../controllers/controllerHelper.js";

async function validadePost(req, res, next) {
  const { postId } = req.body;
  const { userId } = res.locals

  try {
    const postRegistered = await validatePostRepository({postId, userId});
    if (postRegistered.rowCount === 0) {
      return res.status(401).send("Not authorized");
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
  res.locals.postId = postId;
  next();
}

export { validadePost };
