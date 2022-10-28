import { serverErrorResponse } from "../controllers/controllerHelper.js";
import * as deletePostRepository from "../repositories/deletePostRepository.js";

async function deletePost(req, res) {
  const { postId } = res.locals;

  try {
    await deletePostRepository.deleteReposts(postId);
    await deletePostRepository.deleteComments(postId);
    await deletePostRepository.deleteLikes(postId);
    await deletePostRepository.deletePostHashtags(postId);

    const deleteSuccessful = await deletePostRepository.deletePost(postId);

    if (deleteSuccessful.rowCount > 0) {
      return res.status(200).send("Post deleted successfully");
    }
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { deletePost };
