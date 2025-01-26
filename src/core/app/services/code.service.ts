import { geminiClient } from "@/core/infrastructure/ai";
import { ConstraintError } from "../base";

export const CodeService = {
  reviewCode: async (prompt: string, code: string) => {
    if (!prompt) {
      throw new ConstraintError("Prompt is required", 400);
    }
    if (!code) {
      throw new ConstraintError("Can't serve empty code", 400);
    }

    const result = await geminiClient.geminiCodeDebugger({
      code,
      prompt,
    });

    return result;
  },
  detectLangue: async (code: string) => {
    if (code === "") {
      throw new ConstraintError("Code is empty", 400);
    }

    const result = (await geminiClient.detectCodeLanguage(code)) as string;
    return result;
  },
};
