import { AuthController } from "@/core/interfaces/controllers";
import { Router } from "express";
import { googleAuthScope, googleAuthSession } from "@/middlewares";
const router = Router();

const { refresh, signin, signup, googleAuth } = AuthController;
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/refresh", refresh);
router.get("/google", googleAuthScope);
router.get("/google/callback", googleAuthSession, googleAuth);

export default router;
