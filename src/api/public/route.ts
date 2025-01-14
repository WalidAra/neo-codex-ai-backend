import { Router } from "express";
const router = Router();
import { authRouter } from "./routes";

router.use("/auth", authRouter);

export default router;
