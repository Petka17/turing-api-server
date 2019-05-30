import express from "express";
import * as swaggerUi from "swagger-ui-express";
import { Server } from "typescript-rest";

import categories from "./routes/categories";
import department from "./routes/departments";
import swaggerDocument from "./swagger.json";

export const applyFn = (app: express.Router): void => {
  Server.buildServices(app, categories, department);

  // TODO: Activate this route only for development environment
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
