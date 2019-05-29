import "./database/connect";

import express from "express";

import controllers from "./controllers";
import ApiServer from "./utils/api-server";

import Department from "./database/models/department";

const port = Number(process.env.PORT) || 4000;

/**
 * Setup the app
 */
const app = express();

controllers.forEach(
  (controller: Function): void => {
    controller(app);
  }
);

/**
 * Init server
 */
const apiServer: ApiServer<express.Express> = new ApiServer(app, port);

/**
 * Setup graceful stop
 */
type Sig = "SIGINT" | "SIGTERM" | "SIGHUP";
const termSignals: Sig[] = ["SIGINT", "SIGTERM", "SIGHUP"];
termSignals.forEach(
  (sig: Sig): void => {
    process.on(
      sig,
      /* istanbul ignore next */
      (): void => {
        console.log(`\nGracefully shutting down server after ${sig}...`);
        apiServer.stop();
        process.exit(0);
      }
    );
  }
);

/* istanbul ignore next */
if (require.main === module) {
  /**
   * Run this code only if the file is launched directly from command-line
   */
  apiServer
    .start()
    .then(console.info)
    .catch(console.error);

  const dep = new Department();
  dep.name = "Test";
  dep.save();
}

export default apiServer;
