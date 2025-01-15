import { AuthController } from "@/core/interfaces/controllers";
import { Router } from "express";
const router = Router();

const { google, refresh, signin, signup, signout } = AuthController;
router.get("/refresh", refresh);
// router.post("/signin", signin);
// router.post("/signup", signup);
router.post("/signout", signout);
// router.get("/google", google);
// router.get("/google/callback", () => {});

export default router;
