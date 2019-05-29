import express from "express";
import { createConnection } from "typeorm";

import controllers from "./controllers";
import Department from "./database/models/department";
import ApiServer from "./utils/api-server";

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
const main = async (): Promise<string> => {
  const dep: Department = new Department();
  dep.name = "Test3";
  dep.description = "description";
  const connection = await createConnection();
  try {
    await connection.manager.save(dep);
  } catch (e) {}
  return await apiServer.start();
};

/* istanbul ignore next */
if (require.main === module) {
  /**
   * Run this code only if the file is launched directly from command-line
   */
  main()
    .then(console.info)
    .catch(console.error);
}

export default apiServer;
