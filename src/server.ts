import express from "express";

import { applyFn } from "./routes";
import ApiServer from "./utils/api-server";

const createServer = (): ApiServer<express.Express> => {
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
  return new ApiServer(app, port);
};

export default createServer;
