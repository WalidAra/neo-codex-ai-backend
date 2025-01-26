import { prisma } from "@/config";
import { Answer, Chat } from "@prisma/client";
import { answerSelection } from "../db";
import { Conversation } from "@/core/domain/aggregates/conversation";

export const conversationRepo = {
  getAllUserConversations: async (userId: string) => {
    const data = await prisma.chat.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return data;
  },

  createConversation: async (
    inputData: Omit<Chat, "id" | "createdAt" | "updatedAt"> &
      Omit<Answer, "id" | "createdAt" | "updatedAt" | "chatId">
  ) => {
    const { name, userId, idea, prompt, answer } = inputData;
    const data = await prisma.chat.create({
      data: {
        name,
        userId,
        answers: {
          create: {
            idea,
            prompt,
            answer,
          },
        },
      },
      include: {
        answers: {
          select: answerSelection,
        },
      },
    });

    return new Conversation(data);
  },

  getConversationById: async (id: string) => {
    const data = await prisma.chat.findUnique({
      where: {
        id,
      },
      include: {
        answers: {
          select: answerSelection,
        },
      },
    });

    return data ? new Conversation(data) : null;
  },

  processAnswer: async (
    inputData: Omit<Answer, "id" | "createdAt" | "updatedAt">
  ) => {
    const { answer, chatId, idea, prompt } = inputData;

    const data = await prisma.answer.create({
      data: inputData,
      select: answerSelection,
    });

    return data;
  },

  updateChatName: async (name: string, chatId: string) => {
    const data = await prisma.chat.update({
      where: {
        id: chatId,
      },

      data: {
        name,
      },

      include: {
        answers: {
          select: answerSelection,
        },
      },
    });

    return data ? new Conversation(data) : null;
  },

  deleteChat: async (chatId: string) => {
    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return true;
  },
};
