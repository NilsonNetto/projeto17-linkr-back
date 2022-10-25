import express from "express";
import { followUser, unfollowUser } from "../controllers/followController.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = express.Router();

router.post('/follow/:userId/follow', validateToken, followUser);
router.post('/follow/:userId/unfollow', validateToken, unfollowUser);

export default router;