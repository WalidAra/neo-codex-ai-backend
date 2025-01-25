import { UserController } from "@/core/interfaces/controllers";
import { Router } from "express";
const router = Router();

const { profile, signout, getChats } = UserController;

router.get("/me", profile).get("/signout", signout).get("/chats", getChats);

export default router;
