import { validatePostRepository } from "../repositories/postRepository.js";
import { serverErrorResponse } from "../controllers/controllerHelper.js";

async function validadePost(req, res, next) {
  let { postId } = req.body;
  const { userId } = res.locals;

  if (!postId) {
    postId = req.params.postId;
  }

  try {
    const postRegistered = await validatePostRepository({ postId, userId });
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
