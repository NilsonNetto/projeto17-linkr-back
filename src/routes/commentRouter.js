import { Router } from "express";
import { insertComment } from "../controllers/commentsController.js";
import { validateNewComment } from "../middleware/validateCommentMiddleware.js";
import { validadePost } from "../middleware/validatePostMiddleware.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post(
  "/createComment",
  validateToken,
  validadePost,
  validateNewComment,
  insertComment
);

export default router;
