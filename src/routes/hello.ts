import express from "express";

const controller = (app: express.Express): void => {
  app.get(
    "/hello",
    (_, res): void => {
      res.send("Hello");
    }
  );

  app.get(
    "/hello/:name",
    (req, res): void => {
      res.send(`Hello ${req.params["name"]}`);
    }
  );
};

export default controller;
