import express from "express";

const app: express.Express = express();

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

app.listen(
  3000,
  (): void => {
    console.log("Server started");
  }
);
