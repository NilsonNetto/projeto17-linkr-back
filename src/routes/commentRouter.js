import { Router } from "express";
import { insertComment } from "../controllers/commentsController.js";
import { validateNewComment } from "../middleware/validateCommentMiddleware.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post("/createComment", validateToken, validateNewComment, insertComment);

export default router;
