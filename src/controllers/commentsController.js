import { insertNewComment } from "../repositories/commentRepository.js";
import { serverErrorResponse } from "./controllerHelper.js";

async function insertComment(req, res) {
  const { comment, postId } = req.body;
  const { userId } = res.locals;

  try {
    await insertNewComment({ comment, postId, userId });

    return res.status(201).send("comentário criado");
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { insertComment };
