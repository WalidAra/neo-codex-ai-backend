import { envConfig } from "@/config";
import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { User } from "@/core/app/dto/api.dto";
import { AuthService } from "@/core/app/services";
import { Request, Response } from "express";

const { login, refreshToken, register } = AuthService;

export const AuthController = {
  refresh: TryCatchBlock(async (req: Request, res: Response) => {
    const token = req.cookies[envConfig.refreshName] as string | undefined;
    const accessToken = await refreshToken(token);
    res.status(201).json({
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  }),
  signin: TryCatchBlock(async (req: Request, res: Response) => {
    const { email, password, recall } = req.body as {
      email: string;
      password: string;
      recall?: boolean;
    };

    const { user, refreshToken, accessToken } = await login({
      password,
      email,
      recall,
    });

    res.cookie(envConfig.refreshName, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "User signed in successfully",
      data: { ...user, accessToken },
    });
  }),
  signup: TryCatchBlock(async (req: Request, res: Response) => {
    const { email, password, name, recall } = req.body as {
      email: string;
      password: string;
      name: string;
      recall: boolean;
    };
    const { user, refreshToken, accessToken } = await register({
      email,
      password,
      name,
      recall,
    });

    res.cookie(envConfig.refreshName, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "User signed up successfully",
      data: { ...user, accessToken },
    });
  }),
  googleAuth: TryCatchBlock(async (req: Request, res: Response) => {
    if (req.user) {
      const { accessToken, refreshToken } = req.user as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };

      res.cookie(envConfig.refreshName, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      res.redirect(
        `${envConfig.googleJavascriptOrigins}/?token=${accessToken}`
      );
    }
  }),
};
