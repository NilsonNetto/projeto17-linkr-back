import { Router } from "express";
import * as likesControllers from "../controllers/likesControllers.js";
import { userLogged } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/likes/:postId/like', userLogged, likesControllers.likePost);

router.post('/likes/:postId/unlike', userLogged, likesControllers.unlikePost);

export default router;