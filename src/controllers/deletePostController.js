import { serverErrorResponse } from "../controllers/controllerHelper.js";
import { deletePostById } from "../repositories/deletePostRepository.js";

async function deletePost(req, res) {
  const { postId } = res.locals;

  try {
    const deleteSuccessful = await deletePostById(postId);

    if (deleteSuccessful.rowCount > 0) {
      return res.status(200).send("Post deleted successfully");
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { deletePost };
