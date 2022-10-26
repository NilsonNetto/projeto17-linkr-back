import { Router } from "express";
import { Reposts } from "../controllers/repostsControllers.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post('/share', validateToken, Reposts);

export default router;