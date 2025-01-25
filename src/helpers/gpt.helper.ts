import { OpenAI } from "openai";
import { envConfig } from "@/config";

class OpenAIHelper {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: envConfig.openaiKey!,
    });
  }

  async getAnswer(question: string): Promise<string> {
    try {
      const stream = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: question,
          },
        ],
        model: "gpt-4o-mini",
        stream: true,
      });

      let result = "";
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }

      return result;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getAnswerJson(question: string): Promise<string> {
    try {
      const stream = await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Your name is Neo, a senior software engineer and dedicated mentor. You specialize in fixing and debugging code while teaching junior developers how to improve. Adjust your guidance based on the user’s experience level and roadmap progress. Offer detailed explanations for beginners and concise responses for advanced users. Your goal is not just to solve problems but to help users become better developers and track their progress along the learning journey.",
          },
          { role: "assistant", content: question },
        ],
        model: "gpt-4o-mini",
        stream: true,
        response_format: { type: "json_object" },
      });

      let result = "";
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }

      return result;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export default OpenAIHelper;