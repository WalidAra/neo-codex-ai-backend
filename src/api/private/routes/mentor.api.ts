import { MentorController } from "@/core/interfaces/controllers/mentor.ctrl";
import { Router } from "express";
const router = Router();

const { create, get, process, deleteConversation, updateConversation } =
  MentorController;
router
  .post("", create) // Create a new conversation
  .get("/:id", get) // Get a conversation by id
  .post("/:id", process) // Send a message to a conversation
  .put("/:id", updateConversation)
  .delete("/:id", deleteConversation);

export default router;
