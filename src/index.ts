import express from "express";

const app: express.Express = express();

app.get(
  "/hello",
  (_, res): void => {
    res.send("Hello");
  }
);

app.listen(
  3000,
  (): void => {
    console.log("Server started");
  }
);
