import express from "express";

import { initConnection } from "./database/connection";
import { applyFn } from "./routes";
import ApiServer from "./utils/api-server";
import graceful from "./utils/graceful";

const port = Number(process.env.PORT) || 4000;

/**
 * Create app
 */
const app = express();

/**
 * Init routes
 */
applyFn(app);

/**
 * Init server
 */
const apiServer: ApiServer<express.Express> = new ApiServer(app, port);

/**
 * Setup graceful stop
 */
graceful(apiServer);

/* istanbul ignore next */
const main = async (): Promise<string> => {
  await initConnection();
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
