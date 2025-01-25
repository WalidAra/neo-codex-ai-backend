import { MentorController } from "@/core/interfaces/controllers/mentor.ctrl";
import { Router } from "express";
const router = Router();

const { create, get, process } = MentorController;
router
  .post("", create) // Create a new conversation
  .get("/:id", get) // Get a conversation by id
  .post("/:id", process); // Send a message to a conversation

export default router;
