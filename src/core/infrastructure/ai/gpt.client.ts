import OpenAIHelper from "@/helpers/gpt.helper";

class GPTClient {
  private client = new OpenAIHelper();

  public async answerPrompt(userPrompt: string) {
    const result = await this.client.getAnswerJson(userPrompt);
    return result;
  }

  public async debugCode(code: string) {
    const prompt = `
        ${code}
        `;

    const result = await this.client.getAnswerJson(prompt);
    return result;
  }
}

export default GPTClient;
