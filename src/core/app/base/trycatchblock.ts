import { TokenExpiredError } from "jsonwebtoken";
import { ConstraintError } from "./ConstraintError";
import { Request, RequestHandler, Response, NextFunction } from "express";
import chalk from "chalk";
import { envConfig } from "@/config";

export const TryCatchBlock = (fn: RequestHandler): RequestHandler => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      console.log(chalk.red(`~> Error ${error}`));
      if (error instanceof ConstraintError) {
        return res.status(error.status).json({ message: error.message });
      } else if (error instanceof TokenExpiredError) {
        res.clearCookie(envConfig.refreshName, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res.status(403).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }) as RequestHandler;
};
