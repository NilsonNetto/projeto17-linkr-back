import express from "express";
import * as hashtagsControllers from "../controllers/hashtagsControllers.js";
import { userLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/hashtags', userLogged, hashtagsControllers.getHashtags);

router.get('/hashtags/:hashtag', userLogged, hashtagsControllers.getPostsWithHashtag);

export default router;