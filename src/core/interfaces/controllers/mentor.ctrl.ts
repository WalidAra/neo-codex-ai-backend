import { RequestWithAuth } from "@/core/app/base";
import { TryCatchBlock } from "@/core/app/base/trycatchblock";
import { ConversationService } from "@/core/app/services";
import { Request, Response } from "express";

export const MentorController = {
  create: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = (req as RequestWithAuth).auth.user;
    const { prompt, modelAi } = req.body;
    const data = await ConversationService.createConversation({
      prompt,
      modelAi,
      userId: id,
    });

    res.status(201).json({
      message: "Conversation created successfully",
      data,
    });
  }),
  get: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await ConversationService.getConversation(id);

    res.status(200).json({
      message: "Conversation fetched successfully",
      data,
    });
  }),
  process: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { prompt, modelAi } = req.body;
    const data = await ConversationService.processConversation({
      chatId: id,
      prompt,
      modelAi,
    });

    res.status(200).json({
      message: "Conversation processed successfully",
      data,
    });
  }),

  updateConversation: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const data = await ConversationService.updateChatName(name, id);
    res.status(200).json({
      message: "Conversation processed successfully",
      data,
    });
  }),

  deleteConversation: TryCatchBlock(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ConversationService.deleteChat(id);

    res.status(200).json({
      message: "Conversation processed successfully",
    });
  }),
};
