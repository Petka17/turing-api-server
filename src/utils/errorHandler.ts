import express = require("express");
import { Errors } from "typescript-rest";

// https://github.com/thiagobustamante/typescript-rest/issues/16#issuecomment-31480729
export default (
  err: any,
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  // https://github.com/thiagobustamante/typescript-rest/issues/87#issue-423333412
  if (err instanceof Errors.HttpError) {
    if (res.headersSent) {
      // important to allow default error handler to close connection if headers already sent
      return next(err);
    }
    res.set("Content-Type", "application/json");
    res.status(err.statusCode);

    res.json({
      error: {
        status: err.statusCode,
        message: err.message
      }
    });
  } else {
    next(err);
  }
};
