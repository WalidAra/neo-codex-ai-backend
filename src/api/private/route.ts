import { Router } from "express";
const router = Router();

import { userRouter, mentorRouter } from "./routes";

router.use("/user", userRouter);
router.use("/mentor", mentorRouter);

export default router;
