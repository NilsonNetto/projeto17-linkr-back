import { Router } from "express";
import * as likesControllers from "../controllers/likesControllers.js";

const router = Router();

router.post('/likes/:postId/like', likesControllers.likePost);

router.post('/likes/:postId/unlike', likesControllers.unlikePost);

export default router;