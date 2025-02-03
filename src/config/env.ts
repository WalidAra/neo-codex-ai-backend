import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  port: process.env.PORT || 1611,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET as string,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_REDIRECT_URIS,
  googleAuthUri: process.env.GOOGLE_AUTH_URI,
  googleTokenUri: process.env.GOOGLE_TOKEN_URI,
  googleJavascriptOrigins: process.env.GOOGLE_JAVASCRIPT_ORIGINS as string,

  // redisUrl: process.env.REDIS_URL,

  geminiApiKey: process.env.GEMINI_KEY,
  openaiKey: process.env.OPENAI_KEY,
  authBearer: process.env.AUTH_BEARER as string,
  refreshName: process.env.REFRESH_NAME as string,
};

export default envConfig;
