import { Router } from "express";
import { putPost } from "../controllers/editPostController.js";
import { validateNewPost } from "../middleware/editPostMiddleware.js";
import { validadePost } from "../middleware/validatePostMiddleware.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.put("/editPost", validateToken, validadePost, validateNewPost, putPost);

export default router;
