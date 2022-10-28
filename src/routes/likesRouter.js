import { Router } from "express";
import * as likesControllers from "../controllers/likesControllers.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post('/likes/:postId/like', validateToken, likesControllers.likePost);

router.post('/likes/:postId/unlike', validateToken, likesControllers.unlikePost);

router.get('/likes/:postId', validateToken, likesControllers.getLikes);

export default router;