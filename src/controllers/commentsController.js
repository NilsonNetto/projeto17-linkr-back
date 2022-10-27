import {
  insertNewComment,
  getCommentsById,
  getFollowers,
} from "../repositories/commentRepository.js";
import { serverErrorResponse } from "./controllerHelper.js";

async function insertComment(req, res) {
  const { comment, postId } = req.body;
  const { userId } = res.locals;

  try {
    await insertNewComment({ comment, postId, userId });

    return res.status(201).send({ comment, postId, userId });
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function getComments(req, res) {
  const { postId } = req.params;
  const { userId } = res.locals;

  try {
    const comments = (await getCommentsById({ postId, userId })).rows;
    const followersList = (await getFollowers(userId)).rows[0].idFollowers;

    const commentsComplet = comments.map((user) => ({
      ...user,
      following: followersList.includes(user.userId),
    }));

    return res.status(201).send(commentsComplet);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { insertComment, getComments };
