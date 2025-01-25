import { Entity } from "@/core/app/base";
import { Chat } from "@prisma/client";
import {
  Conversation as ConversationDTO,
  Answer,
} from "@/core/app/dto/api.dto";

export class Conversation implements Entity {
  conversation: Chat & { answers: Answer[] };

  constructor(conversation: Chat & { answers: Answer[] }) {
    this.conversation = conversation;
  }

  getData: () => ConversationDTO = () => {
    return {
      name: this.conversation.name,
      id: this.conversation.id,
      createdAt: this.conversation.createdAt,
      answers: this.conversation.answers
    };
  };
}
