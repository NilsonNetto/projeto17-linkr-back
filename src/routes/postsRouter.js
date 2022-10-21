import express from "express";
import { publishPost, getPosts } from './../controllers/postsControllers.js';
import { userLogged } from './../middleware/authMiddleware.js';

const postsRouter = express.Router();

postsRouter.post('/publish', userLogged, publishPost);
postsRouter.get('/timeline', userLogged, getPosts);

export default postsRouter;