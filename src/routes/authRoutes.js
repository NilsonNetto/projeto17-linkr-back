import { SignUp } from "../controllers/authControllers.js";
import { Router } from "express";

const router = Router();

router.post('/signup', SignUp);

export default router;