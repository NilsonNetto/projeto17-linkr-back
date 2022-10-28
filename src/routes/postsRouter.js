import express from "express";
import { publishPost, getPosts, getNewPosts } from "./../controllers/postsControllers.js";
import { validateToken } from "./../middleware/validateTokenMiddleware.js";

const postsRouter = express.Router();

postsRouter.post("/publish", validateToken, publishPost);
postsRouter.get("/timeline/:offset", validateToken, getPosts);
postsRouter.get("/new", validateToken, getNewPosts);

export default postsRouter;
