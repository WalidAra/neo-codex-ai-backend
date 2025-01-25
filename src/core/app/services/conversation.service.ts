import { conversationRepo } from "@/core/infrastructure/repositories";
import { Answer, Chat } from "@prisma/client";
import { ConstraintError } from "../base";
import { geminiClient } from "@/core/infrastructure/ai";

export const ConversationService = {
  createConversation: async ({
    prompt,
    modelAi,
    userId,
  }: Omit<Chat, "id" | "createdAt" | "updatedAt" | "name"> &
    Omit<
      Answer,
      "id" | "createdAt" | "updatedAt" | "chatId" | "idea" | "answer"
    > & {
      modelAi?: "gemini" | "gpt-4o";
    }) => {
    if (!prompt) {
      throw new ConstraintError("Prompt is required", 400);
    }

    let jsonData: { name: string; response: string; idea: string } | null =
      null;

    switch (modelAi) {
      case "gpt-4o":
        // Placeholder for GPT-4o integration
        break;
      case "gemini":
        jsonData = await geminiClient.generateResponse({ userPrompt: prompt });
        break;
      default:
        throw new ConstraintError("Unsupported AI model");
    }

    if (!jsonData) throw new ConstraintError("Failed to generate response");

    const data = await conversationRepo.createConversation({
      answer: jsonData.response,
      idea: jsonData.idea,
      name: jsonData.name,
      prompt: prompt,
      userId: userId,
    });

    return data.getData();
  },
  getConversation: async (chatId: string) => {
    if (!chatId) {
      throw new ConstraintError("ChatId is required", 400);
    }

    const data = await conversationRepo.getConversationById(chatId);

    if (!data) {
      throw new ConstraintError("Conversation not found", 404);
    }

    return data.getData();
  },
  processConversation: async (
    inputData: Omit<
      Answer,
      "id" | "createdAt" | "updatedAt" | "chatId" | "idea" | "answer"
    > & {
      chatId: string;
      modelAi?: "gemini" | "gpt-4o";
    }
  ) => {
    if (!inputData.chatId || !inputData.prompt) {
      throw new ConstraintError(
        "Chat ID and prompt are required to process the conversation",
        400
      );
    }

    let jsonData: { name: string; response: string; idea: string } | null =
      null;

    switch (inputData.modelAi) {
      case "gpt-4o":
        // Placeholder for GPT-4o integration
        break;
      case "gemini":
        jsonData = await geminiClient.generateResponse({
          userPrompt: inputData.prompt,
        });
        break;
      default:
        throw new ConstraintError("Unsupported AI model");
    }

    if (!jsonData) throw new ConstraintError("Failed to generate response");

    const data = await conversationRepo.processAnswer({
      answer: jsonData.response,
      chatId: inputData.chatId,
      idea: jsonData.idea,
      prompt: inputData.prompt,
    });

    return data;
  },

  getUserChats: async (userId: string) => {
    if (!userId) {
      throw new ConstraintError("User ID is required", 400);
    }

    const data = await conversationRepo.getAllUserConversations(userId);
    return data;
  },
};
