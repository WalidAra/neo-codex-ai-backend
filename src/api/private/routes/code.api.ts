import { CodeController } from "@/core/interfaces/controllers";
import { Router } from "express";
const router = Router();

const { detect, review } = CodeController;

router.post("", detect).post("/review", review);

export default router;
