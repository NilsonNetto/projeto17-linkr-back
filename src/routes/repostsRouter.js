import { Router } from "express";
import { Reposts, ListReposts, RepostsQTD } from "../controllers/repostsControllers.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post('/share', validateToken, Reposts);
router.get('/share', validateToken, ListReposts);
router.get('/share/:postId', validateToken, RepostsQTD);

export default router;