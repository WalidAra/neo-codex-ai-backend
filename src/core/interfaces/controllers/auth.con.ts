import { envConfig } from "@/config";
import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { AuthService } from "@/core/app/services";
import { Request, Response } from "express";

const { googleAuth, login, logout, refreshToken, register } = AuthService;

export const AuthController = {
  refresh: TryCatchBlock(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken as string | undefined;
    const accessToken = await refreshToken(token);
    res.status(201).json({
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  }),
  signin: TryCatchBlock(async (req: Request, res: Response) => {}),
  signup: TryCatchBlock(async (req: Request, res: Response) => {}),
  signout: TryCatchBlock(async (_req: Request, res: Response) => {
    const refreshName = envConfig.refreshName;
    res.clearCookie(refreshName, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({ message: "User signed out successfully" });
  }),
  google: TryCatchBlock(async (req: Request, res: Response) => {}),
};
