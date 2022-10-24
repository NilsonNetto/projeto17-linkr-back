import express from "express";
import { validateToken } from "../middleware/validateTokenMiddleware.js";
import { publishPost, getPosts } from './../controllers/postsControllers.js';
import { userLogged } from './../middleware/authMiddleware.js';

const postsRouter = express.Router();

postsRouter.post('/publish', validateToken, publishPost);
postsRouter.get('/timeline', validateToken, getPosts);

export default postsRouter;