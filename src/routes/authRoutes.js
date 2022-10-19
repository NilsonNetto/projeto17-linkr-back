import { SignUp, SignIn } from "../controllers/authControllers.js";
import { Router } from "express";

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);

export default router;
