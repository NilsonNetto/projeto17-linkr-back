import express from "express";
import { publishPost } from './../controllers/postsControllers.js';
import { userLogged } from './../middleware/authMiddleware.js';

const postsRouter = express.Router();

postsRouter.post('/publish', userLogged, publishPost);

export default postsRouter;