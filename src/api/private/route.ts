import { Router } from "express";
const router = Router();
import { userRouter } from "./routes";
router.use("/user", userRouter);

export default router;
