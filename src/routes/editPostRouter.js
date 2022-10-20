import { Router } from "express";
import { editPost } from "../controllers/editPostController.js";
import { validateNewPost } from "../middleware/editPostMiddleware.js";
import { validadePost } from "../middleware/validatePostMiddleware.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.put("/editPost", validateNewPost, validateToken, validadePost, editPost);

export default router;
