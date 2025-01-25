import {
  ConstraintError,
  AuthorizationDTO,
  RequestWithAuth,
} from "@/core/app/base";
import { verifyAuthorization } from "@/scripts";
import { Request, Response, NextFunction, RequestHandler } from "express";

const checkAuth = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const authObj = await verifyAuthorization({ authHeader });
    (req as RequestWithAuth).auth = authObj;
    next();
  } catch (e: unknown) {
    if (e instanceof ConstraintError) {
      return res.status(e.status).json({ message: e.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}) as RequestHandler;

export default checkAuth;
