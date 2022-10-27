import { Router } from "express";
import { Reposts, ListReposts } from "../controllers/repostsControllers.js";
import { validateToken } from "../middleware/validateTokenMiddleware.js";

const router = Router();

router.post('/share', validateToken, Reposts);
router.get('/share', validateToken, ListReposts);

export default router;