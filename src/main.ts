console.clear();

import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";

// import { createServer } from "http";
import { envConfig } from "@/config";
import { logger } from "@/scripts";
import { api } from "@/api";
// import { passportStrategy } from "@/middlewares";

const PORT = envConfig.port || 3000;
const swaggerDocument = YAML.load("./swagger.yaml");

const app: Express = express();

app.use(
  cors({
    credentials: true,
    // origin: envConfig.googleJavascriptOrigins,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(passportStrategy.initialize());

// const httpServer = createServer(app);

app.use("/api", api);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, async () => {
  logger(app, Number(PORT));
});
