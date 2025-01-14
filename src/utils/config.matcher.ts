import chalk from "chalk";

const config = {
  methods: {
    GET: chalk.hex("#60E809"),
    POST: chalk.hex("#f4d03f"),
    PUT: chalk.cyanBright,
    DELETE: chalk.red,
    PATCH: chalk.yellowBright,
    OPTIONS: chalk.blueBright,
    HEAD: chalk.whiteBright,
  },
};

export default config;
