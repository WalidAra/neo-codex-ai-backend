import { ConstraintError } from "@/core/app/base";
import { geminiHelper } from "@/helpers";

const geminiClient = {
  detectCodeLanguage: async (code: string) => {
    const result = await geminiHelper.analyzeCodeLanguage(code);
    return result.response;
  },

  generateResponse: async ({ userPrompt }: { userPrompt: string }) => {
    const result = await geminiHelper.processPrompt(userPrompt);
    const markdownResult = result.response;

    const jsonString = markdownResult.slice(8, markdownResult.length - 4);
    const jsonData = JSON.parse(jsonString) as {
      name: string;
      response: string;
      idea: string;
    } | null;

    if (!jsonData) {
      throw new ConstraintError("Interval server error", 500);
    }

    return jsonData;
  },

  geminiCodeDebugger: async ({
    code,
    prompt,
  }: {
    code: string;
    prompt: string;
  }) => {
    const result = await geminiHelper.reviewCode(code, prompt);
    const markdownResult = result.response;
    const jsonString = markdownResult.slice(8, markdownResult.length - 4);
    const jsonData = JSON.parse(jsonString) as {
      name: string;
      response: string;
      idea: string;
      explanation: string;
    } | null;

    if (!jsonData) {
      throw new ConstraintError("Interval server error", 500);
    }

    return jsonData;
  },
};
export default geminiClient;
