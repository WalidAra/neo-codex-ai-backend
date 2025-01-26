import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { CodeService } from "@/core/app/services";
import { Request, Response } from "express";

export const CodeController = {
  review: TryCatchBlock(async (req: Request, res: Response) => {
    const { code, prompt } = req.body;
    const data = await CodeService.reviewCode(prompt, code);
    res.status(200).json({
      message: "Code detected successfully",
      data,
    });
  }),
  detect: TryCatchBlock(async (req: Request, res: Response) => {
    const { code } = req.body;
    const codeLanguage = await CodeService.detectLangue(code);
    res.status(200).json({
      message: "Code detected successfully",
      data: {
        language: codeLanguage,
      },
    });
  }),
};
