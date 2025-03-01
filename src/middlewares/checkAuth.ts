import { envConfig } from "@/config";
import { RequestWithAuth } from "@/core/app/base";
import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { verifyAuthorization } from "@/scripts";
import { Request, Response, NextFunction } from "express";

const checkAuth = TryCatchBlock(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers[envConfig.refreshName] as string | undefined;
    const authObj = await verifyAuthorization({ authHeader });
    (req as RequestWithAuth).auth = authObj;
    next();
  }
);

export default checkAuth;
