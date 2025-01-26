import { envConfig } from "@/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiHelper {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  public async analyzeCodeLanguage(code: string) {
    const prompt = `
      Identify the programming language of the following code snippet. 
      The input could be a small code snippet in any known programming language, and the output should identify it as a specific language (e.g., Python, JavaScript, C++) so analyze it step by step.
      If the code is too generic or doesn't belong to a recognizable programming language, respond with 'plaintext' else return the response in one word which the programming language you detected.

      Here is the code snippet: 
      ${code}
    `;

    const result = await this.model.generateContent(prompt);
    return {
      response: result.response.text(),
    };
  }

  public async reviewCode(code: string, userPrompt: string) {
    const prompt = `
      Your task here is to review the following code snippet and do the following:
      - Identify the programming language of the code.
      - based on the user prompt review,debug,modify or fix the code snippet .
      - Provide your answer in **JSON format**, adhering to the following structure:
        {
           "name": "<A suitable name for this conversation>",
           "response":<"Markdown contains only the updated code block">,
           "explanation": "<Detailed explanation in Markdown>",
           "idea":"<Resume of explanation>"
        }
      - for the "response" field, don't write "\n" use directly the new line character.
      here is the code snippet:
      ${code}

      here is the user prompt:
      ${userPrompt}
    `;
    const result = await this.model.generateContent(prompt);
    return {
      response: result.response.text(),
    };
  }

  public async processPrompt(userPrompt: string) {
    const prompt = `
Your name is Neo, a senior software engineer and dedicated mentor. You specialize in fixing and debugging code while teaching junior developers how to improve.
Your task is to assist the user with the following prompt:
"${userPrompt}"

### Instructions:
1. Offer detailed explanations suitable for beginners.
2. Ensure that the response is concise yet educational.
3. Provide your answer in **JSON format**, adhering to the following structure:
   {
      "name": "<A suitable name for this conversation>",
      "response": "<Detailed explanation in Markdown>",
      "idea":"<Resume of explanation>"
   }
  
   for the "response" field, don't write "\n" use directly the new line character.
4. For Markdown formatting, use the following conventions:
   - Use headings (e.g., \`##\`) for section titles.
   - Use code blocks (\\\`\\\`\\\`) for any code examples.
   - Provide lists where appropriate for step-by-step instructions.

### Example Output:
{
  "name": "Debugging React Components",
  "response": "## Debugging React Components\\nTo fix your issue, ensure the following steps:\\n1. Check your component's props...\\n\\\`\\\`\\\`javascript\\nconst MyComponent = ({ name }) => <h1>{name}</h1>;\\n\\\`\\\`\\\`\\n",
  "idea": "Debugging React Components: Check your component's props..."
}

Please generate a response following the above structure.
`;

    const result = await this.model.generateContent(prompt);
    return {
      response: result.response.text(),
    };
  }
}

const geminiHelper = new GeminiHelper(envConfig.geminiApiKey as string);

export default geminiHelper;
