import { Router } from "express";
import publicRouter from "./public/route";
import privateRouter from "./private";
const router = Router();

router.use("/public", publicRouter);
router.use("/private", privateRouter);

export default router;
