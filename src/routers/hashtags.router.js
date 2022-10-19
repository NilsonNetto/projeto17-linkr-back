import express from "express";
import * as hashtagsControllers from "../controllers/hashtags.controllers.js";

const router = express.Router();

router.get('/hashtags', hashtagsControllers.getHashtags);

export default router;