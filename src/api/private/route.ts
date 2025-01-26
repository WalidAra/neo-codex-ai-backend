import { Router } from "express";
const router = Router();

import { userRouter, mentorRouter, codeRouter } from "./routes";

router.use("/user", userRouter);
router.use("/mentor", mentorRouter);
router.use("/code", codeRouter);

export default router;
