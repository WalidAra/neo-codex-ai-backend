import { UserController } from "@/core/interfaces/controllers";
import { Router } from "express";
const router = Router();

const { profile, signout, getChats , deleteUser , updateProfile} = UserController;

router
  .get("/me", profile)
  .get("/signout", signout)
  .get("/chats", getChats)
  .put("/me", updateProfile)
  .delete("/me", deleteUser);

export default router;
