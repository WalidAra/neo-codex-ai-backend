import { Router } from "express";
import publicRouter from "./public/route";
import privateRouter from "./private/route";
import { checkAuth } from "@/middlewares";
const router = Router();

router.use("/public", publicRouter);
router.use("/private", checkAuth, privateRouter);

export default router;
