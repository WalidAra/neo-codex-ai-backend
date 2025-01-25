import { envConfig } from "@/config";
import { RequestWithAuth } from "@/core/app/base";
import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { ConversationService } from "@/core/app/services";
import { Request, Response } from "express";

export const UserController = {
  profile: TryCatchBlock(async (req: Request, res: Response) => {
    const { user } = (req as RequestWithAuth).auth;
    res.status(200).json({
      message: "User data retrieved successfully",
      data: user,
    });
  }),
  signout: TryCatchBlock(async (req: Request, res: Response) => {
    res.clearCookie(envConfig.refreshName, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({
      message: "User signed out successfully",
    });
  }),

  getChats: TryCatchBlock(async (req: Request, res: Response) => {
    const { user } = (req as RequestWithAuth).auth;
    const data = await ConversationService.getUserChats(user.id);
    res.status(200).json({
      message: "User chats retrieved successfully",
      data,
    });
  }),
};
