import { UserController } from "@/core/interfaces/controllers";
import { Router } from "express";
const router = Router();
const { profile, signout } = UserController;
router.get("/", profile).get("/signout", signout);

export default router;
