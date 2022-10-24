import { Router } from "express";
import { deletePost } from "../controllers/deletePostController.js";
import { putPost } from "../controllers/editPostController.js";
import { validateNewPost } from "../middleware/editPostMiddleware.js";
import { validadePost } from "../middleware/validatePostMiddleware.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.put("/editPost", validateToken, validadePost, validateNewPost, putPost);
router.delete("/deletePost/:postId", validateToken, validadePost, deletePost);

export default router;
