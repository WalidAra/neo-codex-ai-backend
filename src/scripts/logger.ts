import { Express } from "express";
import { configMatcher } from "@/utils";
import expressListEndpoints from "express-list-endpoints";
import chalk from "chalk";

const logger = (app: Express, PORT: number) => {
  const endpoints = expressListEndpoints(app);  
  const newMatcher = Array.from(
    new Set(
      endpoints.map((obj) => {
        const feature = obj.path.split("/")[3];
        return feature;
      })
    )
  );

  console.log("\n========= Welcome To ALLWA =========\n");
  console.log(chalk.blue(`- Server is running on port:`), PORT);
  console.log(chalk.red(`~> http://localhost:${PORT}/ <~`));
  console.log(chalk.blackBright(`~> http://localhost:${PORT}/docs <~`));
  console.log("\n====================================");

  let index = 0;

  newMatcher.forEach((matcher) => {
    console.log(chalk.cyan(`\nMatcher: ${matcher}\n`));

    const filteredEndpoints = endpoints.filter((endpoint) =>
      endpoint.path.includes(matcher)
    );

    if (filteredEndpoints.length > 0) {
      filteredEndpoints.forEach((endpoint) => {
        endpoint.methods.forEach((method) => {
          const colorFunction =
            configMatcher.methods[
              method as keyof typeof configMatcher.methods
            ] || chalk.white;
          console.log(
            colorFunction(
              `~~> ${method}`,
              chalk.hex("#d35400")(`${endpoint.path}`)
            )
          );
          index++;
        });
      });
    } else {
      console.log(chalk.hex("#FF0000")(`No endpoints for matcher: ${matcher}`));
    }
  });

  console.log("\n====================================");
  console.log(chalk.yellow(`- Total endpoints: ${index}`));
  console.log("====================================\n");
};
export default logger;
