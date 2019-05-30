import express from "express";
import * as swaggerUi from "swagger-ui-express";
import { Server } from "typescript-rest";

import swaggerDocument from "../swagger.json";
import errorHandler from "../utils/errorHandler";
import categories from "./categories";
import department from "./departments";

export const applyFn = (app: express.Router): void => {
  Server.buildServices(app, categories, department);

  // TODO: Activate this route only for development environment
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(errorHandler);
};
