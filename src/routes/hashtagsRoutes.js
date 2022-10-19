import express from "express";
import * as hashtagsControllers from "../controllers/hashtagsControllers.js";

const router = express.Router();

router.get('/hashtags', hashtagsControllers.getTrendingHashtags);

router.get('/hashtags/:hashtag', hashtagsControllers.getHashtag);

export default router;